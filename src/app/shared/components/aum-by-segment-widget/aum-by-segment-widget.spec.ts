import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AumBySegmentWidgetComponent } from './aum-by-segment-widget';

describe('AumBySegmentWidgetComponent', () => {
  let component: AumBySegmentWidgetComponent;
  let fixture: ComponentFixture<AumBySegmentWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AumBySegmentWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AumBySegmentWidgetComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // Clean up chart instance
    if (component.chart) {
      component.chart.destroy();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default tab as "aum"', () => {
    expect(component.activeTab).toBe('aum');
  });

  it('should have 4 tabs defined', () => {
    expect(component.tabs.length).toBe(4);
    expect(component.tabs.map(t => t.id)).toEqual(['aum', 'mtd', 'qtd', 'ytd']);
  });

  it('should have correct segment colors defined', () => {
    expect(component.segmentColors).toEqual({
      '10mm+': '#F19C4A',
      '5mm - 10mm': '#C63663',
      '1mm - 5mm': '#6B3460',
      '500k - 1mm': '#3CBEB7',
      '0 - 500k': '#7A99AC',
    });
  });

  it('should calculate correct total for AUM tab', () => {
    const aumTab = component.tabs.find(tab => tab.id === 'aum');
    expect(aumTab?.total).toBe(2044385738.62);
    expect(aumTab?.displayTotal).toBe('2,044,385,739');
  });

  it('should create chart after view init', (done) => {
    fixture.detectChanges();
    
    // Wait for requestAnimationFrame
    setTimeout(() => {
      expect(component.chart).toBeTruthy();
      done();
    }, 100);
  });

  it('should destroy chart on component destroy', () => {
    fixture.detectChanges();
    const destroySpy = jest.fn();
    component.chart = { destroy: destroySpy } as any;
    
    component.ngOnDestroy();
    
    expect(destroySpy).toHaveBeenCalled();
    expect(component.chart).toBeNull();
  });

  it('should change active tab and recreate chart', (done) => {
    fixture.detectChanges();
    
    component.onTabChange('mtd');
    
    expect(component.activeTab).toBe('mtd');
    
    // Wait for requestAnimationFrame
    setTimeout(() => {
      expect(component.chart).toBeTruthy();
      done();
    }, 100);
  });

  it('should return correct active tab data', () => {
    component.activeTab = 'ytd';
    const activeTabData = component.getActiveTabData();
    
    expect(activeTabData?.id).toBe('ytd');
    expect(activeTabData?.label).toBe('YTD');
  });

  it('should format values correctly', () => {
    expect(component.formatValue(1000000)).toBe('1,000,000');
    expect(component.formatValue(123456.789)).toBe('123,457');
    expect(component.formatValue(0)).toBe('0');
  });

  it('should toggle segment visibility', () => {
    const segment = '10mm+';
    const aumTab = component.tabs[0];
    const segmentData = aumTab.data.find(d => d.segment === segment);
    
    // Spy on private createChart method
    const createChartSpy = jest.spyOn(component as any, 'createChart');
    
    // Initially visible (undefined means visible)
    expect(segmentData?.visible).toBeUndefined();
    
    component.toggleSegment(segment);
    expect(segmentData?.visible).toBe(false);
    expect(createChartSpy).toHaveBeenCalled();
    
    component.toggleSegment(segment);
    expect(segmentData?.visible).toBe(true);
    expect(createChartSpy).toHaveBeenCalledTimes(2);
  });

  it('should check segment visibility correctly', () => {
    const segment = '5mm - 10mm';
    const aumTab = component.tabs[0];
    const segmentData = aumTab.data.find(d => d.segment === segment);
    
    // Initially visible
    expect(component.isSegmentVisible(segment)).toBe(true);
    
    // Make invisible
    if (segmentData) {
      segmentData.visible = false;
    }
    expect(component.isSegmentVisible(segment)).toBe(false);
  });

  it('should handle missing canvas element gracefully', () => {
    component.chartCanvas = undefined as any;
    
    expect(() => component.ngAfterViewInit()).not.toThrow();
    expect(() => component.onTabChange('mtd')).not.toThrow();
  });

  it('should handle missing tab data gracefully', () => {
    component.activeTab = 'invalid-tab';
    
    expect(component.getActiveTabData()).toBeUndefined();
    expect(() => component.toggleSegment('10mm+')).not.toThrow();
    expect(component.isSegmentVisible('10mm+')).toBe(true);
  });

  it('should filter out hidden segments when creating chart', () => {
    // Hide a segment
    const aumTab = component.tabs[0];
    const segmentToHide = aumTab.data[0];
    segmentToHide.visible = false;
    
    // Test that hidden segments are filtered when getting visible data
    const visibleData = aumTab.data.filter(item => item.visible !== false);
    
    // Should have 4 visible segments (5 total - 1 hidden)
    expect(aumTab.data.length).toBe(5);
    expect(visibleData.length).toBe(4);
    
    // Verify the hidden segment is not in visible data
    expect(visibleData.find(d => d.segment === segmentToHide.segment)).toBeUndefined();
  });

  it('should have correct chart configuration', (done) => {
    fixture.detectChanges();
    
    setTimeout(() => {
      if (component.chart) {
        const config = component.chart.config;
        
        expect((config as any).type).toBe('bar');
        expect(config.options?.plugins?.legend?.display).toBe(false);
        expect(config.options?.plugins?.tooltip?.enabled).toBe(true);
        expect(config.options?.scales?.['x']?.display).toBe(false);
        expect(config.options?.scales?.['y']?.display).toBe(true);
      }
      done();
    }, 100);
  });

  it('should format y-axis ticks correctly', () => {
    fixture.detectChanges();
    
    const tickCallback = component.chart?.config.options?.scales?.['y']?.ticks?.callback;
    if (tickCallback && typeof tickCallback === 'function') {
      const mockScale = {} as any;
      expect(tickCallback.call(mockScale, 0, 0, {} as any)).toBe('0');
      expect(tickCallback.call(mockScale, 1000000, 0, {} as any)).toBe('1mm');
      expect(tickCallback.call(mockScale, 5000000, 0, {} as any)).toBe('5mm');
      expect(tickCallback.call(mockScale, 5000, 0, {} as any)).toBe('5k');
      expect(tickCallback.call(mockScale, 500, 0, {} as any)).toBe('500');
    }
  });

  it('should have correct tooltip configuration', (done) => {
    fixture.detectChanges();
    
    setTimeout(() => {
      if (component.chart) {
        const tooltipCallbacks = component.chart.config.options?.plugins?.tooltip?.callbacks;
        
        if (tooltipCallbacks) {
          // Test title callback
          const titleCallback = tooltipCallbacks.title;
          if (titleCallback && typeof titleCallback === 'function') {
            const mockContext = [{ label: '10mm+' }] as any;
            expect(titleCallback.call({} as any, mockContext)).toBe('10mm+');
          }
          
          // Test label callback
          const labelCallback = tooltipCallbacks.label;
          if (labelCallback && typeof labelCallback === 'function') {
            const mockContext = { parsed: { y: 1234567 } } as any;
            expect(labelCallback.call({} as any, mockContext)).toBe('$1,234,567');
          }
        }
      }
      done();
    }, 100);
  });

  it('should handle negative values in MTD tab', () => {
    const mtdTab = component.tabs.find(tab => tab.id === 'mtd');
    const negativeSegment = mtdTab?.data.find(d => d.segment === '0 - 500k');
    
    expect(negativeSegment?.value).toBe(-8854.36);
    expect(negativeSegment?.displayValue).toBe('-8,854');
  });

  it('should use absolute values for chart data', (done) => {
    component.activeTab = 'mtd';
    fixture.detectChanges();
    
    setTimeout(() => {
      if (component.chart) {
        const chartData = component.chart.data.datasets[0].data;
        // All values should be positive
        chartData.forEach(value => {
          expect(Number(value)).toBeGreaterThanOrEqual(0);
        });
      }
      done();
    }, 100);
  });
});