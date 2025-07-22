import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';
import { TickerBannerComponent } from '../../shared/components/ticker-banner/ticker-banner';
import { WelcomeWidgetComponent } from '../../shared/components/welcome-widget/welcome-widget';
import { KpiSectionComponent } from '../../shared/components/kpi-section/kpi-section';
import { AlertsWidgetComponent } from '../../shared/components/alerts-widget/alerts-widget';
import { ContributionsWithdrawalsWidgetComponent } from '../../shared/components/contributions-withdrawals-widget/contributions-withdrawals-widget';
import { MyTasksWidgetComponent } from '../../shared/components/my-tasks-widget/my-tasks-widget';
import { FeaturedContentWidgetComponent } from '../../shared/components/featured-content-widget/featured-content-widget';
import { AccountsWidgetComponent } from '../../shared/components/accounts-widget/accounts-widget';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardContentDirective,
} from '../../shared/ui/ui-card-helm/src/index';
import { QuickLinksWidgetComponent } from '../../shared/components/quick-links-widget/quick-links-widget';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    TickerBannerComponent,
    WelcomeWidgetComponent,
    KpiSectionComponent,
    AlertsWidgetComponent,
    ContributionsWithdrawalsWidgetComponent,
    MyTasksWidgetComponent,
    FeaturedContentWidgetComponent,
    AccountsWidgetComponent,
    QuickLinksWidgetComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  userName: string = 'Sam';
  lastLoginDate: string = 'March 15, 2023';

  onSearch(query: string) {
    console.log('Searching for:', query);
    // Implement search logic here
  }
}
