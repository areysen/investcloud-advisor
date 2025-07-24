import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardContentDirective,
} from '../../ui/ui-card-helm/src/index';
import {
  HlmTabsComponent,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '../../ui/ui-tabs-helm/src/index';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

interface SegmentData {
  segment: string;
  value: number;
  displayValue: string;
  color: string;
  visible?: boolean;
}

interface TabData {
  id: string;
  label: string;
  data: SegmentData[];
  total: number;
  displayTotal: string;
}

@Component({
  selector: 'app-aum-by-segment-widget',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
  ],
  templateUrl: './aum-by-segment-widget.html',
  styleUrl: './aum-by-segment-widget.scss',
})
export class AumBySegmentWidgetComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('chartCanvas', { static: false })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  activeTab = 'aum';
  chart: Chart | null = null;

  // Define segment colors based on the design
  segmentColors = {
    '10mm+': '#F19C4A', // Orange
    '5mm - 10mm': '#C63663', // Pink/Red
    '1mm - 5mm': '#6B3460', // Purple (Primary)
    '500k - 1mm': '#3CBEB7', // Teal
    '0 - 500k': '#7A99AC', // Blue-Gray
  };

  tabs: TabData[] = [
    {
      id: 'aum',
      label: 'AUM',
      data: [
        {
          segment: '10mm+',
          value: 450000000,
          displayValue: '450,000,000',
          color: this.segmentColors['10mm+'],
        },
        {
          segment: '5mm - 10mm',
          value: 190392073.81,
          displayValue: '190,392,074',
          color: this.segmentColors['5mm - 10mm'],
        },
        {
          segment: '1mm - 5mm',
          value: 40893623.5,
          displayValue: '40,893,624',
          color: this.segmentColors['1mm - 5mm'],
        },
        {
          segment: '500k - 1mm',
          value: 2330340.52,
          displayValue: '2,330,341',
          color: this.segmentColors['500k - 1mm'],
        },
        {
          segment: '0 - 500k',
          value: 1309188.44,
          displayValue: '1,309,188',
          color: this.segmentColors['0 - 500k'],
        },
      ],
      total: 2044385738.62,
      displayTotal: '2,044,385,739',
    },
    {
      id: 'mtd',
      label: 'MTD',
      data: [
        {
          segment: '10mm+',
          value: 3500000,
          displayValue: '3,500,000',
          color: this.segmentColors['10mm+'],
        },
        {
          segment: '5mm - 10mm',
          value: 2096345.57,
          displayValue: '2,096,346',
          color: this.segmentColors['5mm - 10mm'],
        },
        {
          segment: '1mm - 5mm',
          value: 2947.61,
          displayValue: '2,948',
          color: this.segmentColors['1mm - 5mm'],
        },
        {
          segment: '500k - 1mm',
          value: 55073.38,
          displayValue: '55,073',
          color: this.segmentColors['500k - 1mm'],
        },
        {
          segment: '0 - 500k',
          value: -8854.36,
          displayValue: '-8,854',
          color: this.segmentColors['0 - 500k'],
        },
      ],
      total: 8178343.39,
      displayTotal: '8,178,343',
    },
    {
      id: 'qtd',
      label: 'QTD',
      data: [
        {
          segment: '10mm+',
          value: 3500000,
          displayValue: '3,500,000',
          color: this.segmentColors['10mm+'],
        },
        {
          segment: '5mm - 10mm',
          value: 2096345.57,
          displayValue: '2,096,346',
          color: this.segmentColors['5mm - 10mm'],
        },
        {
          segment: '1mm - 5mm',
          value: 2947.61,
          displayValue: '2,948',
          color: this.segmentColors['1mm - 5mm'],
        },
        {
          segment: '500k - 1mm',
          value: 55073.38,
          displayValue: '55,073',
          color: this.segmentColors['500k - 1mm'],
        },
        {
          segment: '0 - 500k',
          value: -8854.36,
          displayValue: '-8,854',
          color: this.segmentColors['0 - 500k'],
        },
      ],
      total: 8178343.39,
      displayTotal: '8,178,343',
    },
    {
      id: 'ytd',
      label: 'YTD',
      data: [
        {
          segment: '10mm+',
          value: 5000000,
          displayValue: '5,000,000',
          color: this.segmentColors['10mm+'],
        },
        {
          segment: '5mm - 10mm',
          value: -124141.02,
          displayValue: '-124,141',
          color: this.segmentColors['5mm - 10mm'],
        },
        {
          segment: '1mm - 5mm',
          value: 1204340.91,
          displayValue: '1,204,341',
          color: this.segmentColors['1mm - 5mm'],
        },
        {
          segment: '500k - 1mm',
          value: 138400.33,
          displayValue: '138,400',
          color: this.segmentColors['500k - 1mm'],
        },
        {
          segment: '0 - 500k',
          value: 49725.58,
          displayValue: '49,726',
          color: this.segmentColors['0 - 500k'],
        },
      ],
      total: 16542927.42,
      displayTotal: '16,542,927',
    },
  ];

  ngOnInit() {
    // Initial chart will be created when view initializes
  }

  ngAfterViewInit() {
    // Create chart after view is initialized with proper check
    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      requestAnimationFrame(() => {
        this.createChart();
      });
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  onTabChange(tabId: string) {
    this.activeTab = tabId;
    // Recreate chart with new data using requestAnimationFrame
    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      requestAnimationFrame(() => {
        this.createChart();
      });
    }
  }

  private createChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const activeTabData = this.tabs.find((tab) => tab.id === this.activeTab);
    if (!activeTabData || !this.chartCanvas || !this.chartCanvas.nativeElement) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Prepare data for Chart.js - filter out hidden segments
    const visibleData = activeTabData.data.filter(
      (item) => item.visible !== false
    );
    const chartData = visibleData.map((item) => Math.abs(item.value));
    const backgroundColors = visibleData.map((item) => item.color);

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: visibleData.map((item) => item.segment),
        datasets: [
          {
            data: chartData,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 0,
            barPercentage: 0.7,
            categoryPercentage: 0.8,
            borderRadius: {
              topLeft: 2,
              topRight: 2,
              bottomLeft: 0,
              bottomRight: 0
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            padding: 12,
            cornerRadius: 4,
            displayColors: true,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            titleFont: {
              size: 13,
              weight: 600
            },
            bodyFont: {
              size: 14,
              weight: 500
            },
            callbacks: {
              title: function(context) {
                return context[0].label || '';
              },
              label: function(context) {
                const value = context.parsed.y;
                const formattedValue = value.toLocaleString('en-US', { 
                  maximumFractionDigits: 0 
                });
                return '$' + formattedValue;
              }
            }
          },
          datalabels: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false,
            },
          },
          y: {
            display: true,
            grid: {
              color: '#E5E7EB',
            },
            border: {
              display: false,
            },
            ticks: {
              callback: function (value) {
                // Format y-axis labels
                const num = Number(value);
                if (num === 0) return '0';
                if (num >= 1000000) {
                  return (num / 1000000).toFixed(0) + 'mm';
                } else if (num >= 1000) {
                  return (num / 1000).toFixed(0) + 'k';
                }
                return num.toString();
              },
              padding: 10,
              color: '#6B7280',
              font: {
                size: 12,
              },
              // Force specific tick values to match the design
              count: 5, // This will create 5 ticks including 0
              maxTicksLimit: 5,
            },
            beginAtZero: false,
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }

  getActiveTabData(): TabData | undefined {
    return this.tabs.find((tab) => tab.id === this.activeTab);
  }

  formatValue(value: number): string {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  toggleSegment(segment: string) {
    // Find the segment in the active tab data
    const activeTabData = this.tabs.find((tab) => tab.id === this.activeTab);
    if (!activeTabData) return;

    const segmentData = activeTabData.data.find(
      (item) => item.segment === segment
    );
    if (!segmentData) return;

    // Toggle visibility (default to true if not set)
    segmentData.visible = segmentData.visible === false;

    // Recreate the chart with updated data
    this.createChart();
  }

  isSegmentVisible(segment: string): boolean {
    const activeTabData = this.tabs.find((tab) => tab.id === this.activeTab);
    if (!activeTabData) return true;

    const segmentData = activeTabData.data.find(
      (item) => item.segment === segment
    );
    return segmentData?.visible !== false;
  }
}
