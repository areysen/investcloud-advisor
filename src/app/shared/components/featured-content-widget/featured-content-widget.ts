import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmCardDirective, HlmCardHeaderDirective, HlmCardTitleDirective, HlmCardContentDirective } from '../../ui/ui-card-helm/src/index';
import { HlmButtonDirective } from '../../ui/ui-button-helm/src/lib/hlm-button.directive';
import { HlmTabsComponent, HlmTabsListComponent, HlmTabsTriggerDirective, HlmTabsContentDirective } from '../../ui/ui-tabs-helm/src/index';

export interface FeaturedContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  type: 'event' | 'news';
}

@Component({
  selector: 'app-featured-content-widget',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmButtonDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective
  ],
  templateUrl: './featured-content-widget.html',
  styleUrl: './featured-content-widget.scss'
})
export class FeaturedContentWidgetComponent {
  @Input() featuredItems: FeaturedContentItem[] = [
    {
      id: 'event1',
      title: 'InvestCloud Annual Conference',
      description: 'Come meet other advisors at this is an annual event where we celebrate the InvestCloud community and discuss new initiatives at the firm.',
      imageUrl: 'assets/images/upcoming-event.png',
      buttonText: 'REGISTER NOW',
      type: 'event'
    },
    {
      id: 'news1',
      title: 'The Client Portal mobile app is now live!',
      description: 'Make sure you share the exciting news with your clients',
      imageUrl: 'assets/images/whats-new.png',
      buttonText: 'READ MORE',
      type: 'news'
    }
  ];

  activeTab = 'event';

  get eventItem(): FeaturedContentItem | undefined {
    return this.featuredItems.find(item => item.type === 'event');
  }

  get newsItem(): FeaturedContentItem | undefined {
    return this.featuredItems.find(item => item.type === 'news');
  }

  onButtonClick() {
    console.log('Featured content button clicked:', this.activeTab === 'event' ? this.eventItem : this.newsItem);
    // Implement navigation or action
  }
}