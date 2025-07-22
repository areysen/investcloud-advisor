import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TickerItem {
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
}

@Component({
  selector: 'app-ticker-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticker-banner.html',
  styleUrl: './ticker-banner.scss'
})
export class TickerBannerComponent implements OnInit, OnDestroy {
  tickerItems: TickerItem[] = [
    { symbol: 'Aggregate Bond Index', value: 110.16, change: 0.04, changePercent: 0.04 },
    { symbol: 'DJIA', value: 38538.04, change: -5.27, changePercent: -0.02 },
    { symbol: 'NASDAQ', value: 15283.02, change: 17.38, changePercent: 0.28 },
    { symbol: 'NASDAQ 100', value: 9838.08, change: 15.55, changePercent: 0.27 },
    { symbol: 'NIFTY Smallcap', value: 1808.40, change: 1.55, changePercent: 0.7 },
    { symbol: 'S&P 500', value: 4827.95, change: 12.41, changePercent: 0.26 },
    { symbol: 'Russell 2000', value: 2156.73, change: -8.92, changePercent: -0.41 },
    { symbol: 'FTSE 100', value: 7682.50, change: 24.37, changePercent: 0.32 },
    { symbol: 'DAX', value: 17419.33, change: -45.21, changePercent: -0.26 },
    { symbol: 'Nikkei 225', value: 38596.47, change: 156.23, changePercent: 0.41 },
    { symbol: 'Hang Seng', value: 17093.11, change: -127.45, changePercent: -0.74 },
    { symbol: 'Euro Stoxx 50', value: 4897.24, change: 18.92, changePercent: 0.39 }
  ];

  // Duplicate items for seamless scrolling
  displayItems: TickerItem[] = [];
  private animationId: number | null = null;

  ngOnInit() {
    // Triple the items to ensure smooth infinite scroll
    this.displayItems = [...this.tickerItems, ...this.tickerItems, ...this.tickerItems];
    
    // Start price updates
    this.startPriceUpdates();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private startPriceUpdates() {
    // Update prices every 3-5 seconds with realistic changes
    setInterval(() => {
      this.tickerItems = this.tickerItems.map(item => {
        // Random small change between -0.5% and 0.5%
        const changePercent = (Math.random() - 0.5) * 0.01;
        const changeValue = item.value * changePercent;
        
        return {
          ...item,
          value: item.value + changeValue,
          change: changeValue,
          changePercent: changePercent * 100
        };
      });
      
      // Update display items
      this.displayItems = [...this.tickerItems, ...this.tickerItems, ...this.tickerItems];
    }, 4000);
  }

  getChangeClass(change: number): string {
    if (change > 0) return 'positive';
    if (change < 0) return 'negative';
    return 'neutral';
  }

  formatValue(value: number): string {
    return value.toFixed(2);
  }

  formatChange(change: number): string {
    const sign = change >= 0 ? '+' : '';
    return sign + change.toFixed(2);
  }

  formatPercent(percent: number): string {
    const sign = percent >= 0 ? '+' : '';
    return sign + percent.toFixed(2) + '%';
  }
}