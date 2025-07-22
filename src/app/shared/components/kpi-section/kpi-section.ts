import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiWidgetComponent, KpiData } from '../kpi-widget/kpi-widget';

@Component({
  selector: 'app-kpi-section',
  standalone: true,
  imports: [CommonModule, KpiWidgetComponent],
  templateUrl: './kpi-section.html',
  styleUrl: './kpi-section.scss'
})
export class KpiSectionComponent {
  kpis: KpiData[] = [
    {
      label: 'Total AUM',
      value: '983,843,054',
      subLabel: 'As of 03/15/2023'
    },
    {
      label: 'Total Cost',
      value: '944,124,300'
    },
    {
      label: 'Unrealized G/L',
      value: '38,164,246'
    },
    {
      label: 'Daily Change',
      value: '27,793,060'
    },
    {
      label: 'Daily Change (%)',
      value: '2.75%'
    },
    {
      label: 'YTD Change',
      value: '35,793,151'
    },
    {
      label: 'Number of Accounts',
      value: 112
    },
    {
      label: 'Total Relationships',
      value: 55
    }
  ];
}