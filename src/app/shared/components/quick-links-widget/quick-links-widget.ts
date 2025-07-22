import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmCardDirective, HlmCardHeaderDirective, HlmCardTitleDirective, HlmCardContentDirective } from '../../ui/ui-card-helm/src/index';
import { HlmButtonDirective } from '../../ui/ui-button-helm/src/lib/hlm-button.directive';

export interface QuickLink {
  id: string;
  label: string;
  action: () => void;
}

@Component({
  selector: 'app-quick-links-widget',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmButtonDirective
  ],
  templateUrl: './quick-links-widget.html',
  styleUrl: './quick-links-widget.scss'
})
export class QuickLinksWidgetComponent {
  @Input() quickLinks: QuickLink[] = [
    { id: 'portfolio', label: 'PORTFOLIO MGMT', action: () => console.log('Portfolio Management') },
    { id: 'alerts', label: 'RECENT ALERTS', action: () => console.log('Recent Alerts') },
    { id: 'tasks', label: 'MANAGE TASKS', action: () => console.log('Manage Tasks') },
    { id: 'reports', label: 'RUN INDIV REPORTS', action: () => console.log('Run Individual Reports') },
    { id: 'tax', label: 'CLIENT TXN', action: () => console.log('Client Transaction') },
    { id: 'profile', label: 'PROFILE & SETTINGS', action: () => console.log('Profile & Settings') },
    { id: 'user', label: 'BECOME USER', action: () => console.log('Become User') },
    { id: 'clients', label: 'SEARCH CLIENTS', action: () => console.log('Search Clients') },
    { id: 'messages', label: 'VIEW MESSAGES', action: () => console.log('View Messages') },
    { id: 'prospects', label: 'VIEW PROSPECTS', action: () => console.log('View Prospects') },
    { id: 'renter', label: 'RESEARCH RENTER', action: () => console.log('Research Renter') },
    { id: 'memos', label: 'VOICE MEMOS', action: () => console.log('Voice Memos') }
  ];

  onLinkClick(link: QuickLink) {
    link.action();
  }
}