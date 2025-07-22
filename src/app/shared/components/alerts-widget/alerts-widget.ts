import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmCardDirective, HlmCardHeaderDirective, HlmCardTitleDirective, HlmCardContentDirective } from '../../ui/ui-card-helm/src/index';
import { HlmButtonDirective } from '../../ui/ui-button-helm/src/lib/hlm-button.directive';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBell } from '@ng-icons/lucide';

export interface Alert {
  id: string;
  message: string;
  date: string;
  type?: 'error' | 'info' | 'warning' | 'success';
}

@Component({
  selector: 'app-alerts-widget',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmButtonDirective,
    NgIconComponent
  ],
  providers: [
    provideIcons({ lucideBell })
  ],
  templateUrl: './alerts-widget.html',
  styleUrl: './alerts-widget.scss'
})
export class AlertsWidgetComponent {
  @Input() alerts: Alert[] = [
    { id: '1', message: 'Edna Edwards account opening error', date: '03/14/2023', type: 'error' },
    { id: '2', message: 'John Smith opened an account', date: '03/14/2023', type: 'info' },
    { id: '3', message: 'Edward Miles account funded $2,000...', date: '03/14/2023', type: 'success' },
    { id: '4', message: 'Amelia Gilbert closed an account', date: '03/14/2023', type: 'warning' },
    { id: '5', message: 'Sam Bentley account opening error', date: '03/14/2023', type: 'error' }
  ];

  onViewAll() {
    console.log('View all alerts clicked');
    // Implement navigation to alerts page
  }

  onBellClick() {
    console.log('Bell icon clicked');
    // Implement notification menu or navigation
  }
}