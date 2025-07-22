import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface KpiData {
  label: string;
  value: string | number;
  subLabel?: string;
  change?: number;
  changePercent?: number;
}

@Component({
  selector: 'app-kpi-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-widget.html',
  styleUrl: './kpi-widget.scss'
})
export class KpiWidgetComponent {
  @Input() kpi!: KpiData;
  @Input() variant: 'large' | 'small' = 'small';
  
  get formattedValue(): string {
    if (typeof this.kpi.value === 'number') {
      // Format large numbers with commas
      return this.kpi.value.toLocaleString('en-US');
    }
    return this.kpi.value;
  }
  
  get changeClass(): string {
    if (!this.kpi.change) return '';
    return this.kpi.change > 0 ? 'positive' : 'negative';
  }
  
  get formattedChange(): string {
    if (!this.kpi.changePercent) return '';
    const sign = this.kpi.changePercent > 0 ? '+' : '';
    return sign + this.kpi.changePercent.toFixed(2) + '%';
  }
}