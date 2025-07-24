import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HlmCardDirective,
  HlmCardContentDirective,
} from '../../ui/ui-card-helm/src';

interface KPIItem {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

@Component({
  selector: 'app-kpi-summary-widget',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardContentDirective,
  ],
  template: `
    <div hlmCard class="kpi-card">
      <div hlmCardContent class="p-0">
        <div class="kpi-grid">
          @for (kpi of kpiData; track kpi.label) {
            <div class="kpi-item">
              <div class="kpi-label">{{ kpi.label }}</div>
              <div class="kpi-value">{{ kpi.value }}</div>
              @if (kpi.change) {
                <div class="kpi-change" [ngClass]="'change-' + kpi.changeType">
                  {{ kpi.change }}
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .kpi-card {
      height: 90px;
      padding: 0;
      background: rgba(255, 255, 255, 0.80);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.03);
    }

    .kpi-grid {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-around;
      padding: 0 20px;
    }

    .kpi-item {
      text-align: center;
      flex: 1;
      position: relative;
    }

    .kpi-item:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 40px;
      width: 1px;
      background-color: #e0e3e7;
    }

    .kpi-label {
      font-family: 'Red Hat Text', sans-serif;
      font-size: 12px;
      font-weight: 400;
      color: #637482;
      margin-bottom: 2px;
    }

    .kpi-value {
      font-family: 'Red Hat Text', sans-serif;
      font-size: 24px;
      font-weight: 600;
      color: #212b36;
      line-height: 1.2;
    }

    .kpi-change {
      font-family: 'Red Hat Text', sans-serif;
      font-size: 12px;
      font-weight: 500;
      margin-top: 2px;
    }

    .change-positive {
      color: #00ab48;
    }

    .change-negative {
      color: #d5000d;
    }

    .change-neutral {
      color: #637482;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiSummaryWidgetComponent {
  kpiData: KPIItem[] = [
    {
      label: 'AUM',
      value: '$12.3B',
      change: '+2.5%',
      changeType: 'positive',
    },
    {
      label: 'Total Clients',
      value: '1,234',
      change: '+42',
      changeType: 'positive',
    },
    {
      label: 'New Accounts',
      value: '78',
      change: '+12.3%',
      changeType: 'positive',
    },
    {
      label: 'Avg Account Value',
      value: '$9.97M',
      change: '-0.8%',
      changeType: 'negative',
    },
  ];
}