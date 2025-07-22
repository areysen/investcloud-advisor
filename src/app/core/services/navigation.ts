import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MenuItem {
  label: string;
  route?: string;
  children?: MenuItem[];
}

export interface UserMenuItem {
  label: string;
  route?: string;
  action?: string;
  value?: string;
  selected?: boolean;
  submenu?: UserMenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private activeDropdownSubject = new BehaviorSubject<string | null>(null);
  activeDropdown$ = this.activeDropdownSubject.asObservable();

  navigationConfig: MenuItem[] = [
    {
      label: 'DASHBOARD',
      route: '/dashboard'
    },
    {
      label: 'CLIENTS',
      children: [
        { label: 'INDIVIDUALS', route: '/clients/individuals' },
        { label: 'RELATIONSHIPS', route: '/clients/relationships' },
        { label: 'INTERESTED PARTIES', route: '/clients/interested-parties' },
        { label: 'PROSPECTS', route: '/clients/prospects' },
        { label: 'ADDRESSES', route: '/clients/addresses' }
      ]
    },
    {
      label: 'PORTFOLIOS',
      children: [
        { label: 'WATCHLIST', route: '/portfolios/watchlist' },
        { label: 'ACCOUNTS', route: '/portfolios/accounts' },
        { label: 'HOLDINGS', route: '/portfolios/holdings' },
        { label: 'TRANSACTIONS', route: '/portfolios/transactions' },
        { label: 'SECURITY HOLDER CROSS REFERENCE', route: '/portfolios/security-holder-cross-reference' },
        { label: 'TAX LOTS', route: '/portfolios/tax-lots' },
        { label: 'PROJECTED INCOME', route: '/portfolios/projected-income' },
        { label: 'PERFORMANCE SUMMARY', route: '/portfolios/performance-summary' },
        { label: 'DRIFT ANALYSIS', route: '/portfolios/drift-analysis' },
        { label: 'FIXED INCOME', route: '/portfolios/fixed-income' },
        { label: 'ACCOUNT BENEFICIARIES', route: '/portfolios/account-beneficiaries' }
      ]
    },
    {
      label: 'PLANNING',
      children: [
        { label: 'CLIENT PLANS', route: '/planning/client-plans' }
      ]
    },
    {
      label: 'Search',
      children: [
        { label: 'PRODUCT SEARCH', route: '/search/product-search' },
        { label: 'SAVED SEARCHES', route: '/search/saved-searches' },
        { label: 'FAVORITES', route: '/search/favorites' }
      ]
    },
    {
      label: 'Reporting',
      children: [
        { label: 'DOCUMENTS', route: '/reporting/documents' },
        { label: 'REPORTS', route: '/reporting/reports' },
        { label: 'RUN REPORT', route: '/reporting/run-report' },
        { label: 'REPORT TEMPLATES', route: '/reporting/report-templates' },
        { label: 'REPORT TEMPLATE RUNS', route: '/reporting/report-template-runs' },
        { label: 'SCHEDULE REPORTS', route: '/reporting/schedule-reports' }
      ]
    },
    {
      label: 'tools',
      children: [
        { label: 'KNOWLEDGE CENTER', route: '/tools/knowledge-center' },
        { label: 'TEAM MESSAGING', route: '/tools/team-messaging' },
        { label: 'SECURE MESSAGING', route: '/tools/secure-messaging' },
        { label: 'ACCOUNT GROUPS', route: '/tools/account-groups' },
        { label: 'TASKS', route: '/tools/tasks' },
        { label: 'BECOME USER', route: '/tools/become-user' }
      ]
    }
  ];

  userMenuConfig = {
    user: 'Sam smithson',
    avatar: 'assets/images/default-avatar.png',
    menuItems: [
      { label: 'PROFILE & SETTINGS', route: '/profile' },
      { 
        label: 'THEME', 
        submenu: [
          { label: 'Auto', value: 'auto' },
          { label: 'Dark', value: 'dark' },
          { label: 'Light', value: 'light', selected: true }
        ]
      },
      { label: 'LOGOUT', action: 'logout' }
    ]
  };

  setActiveDropdown(label: string | null) {
    this.activeDropdownSubject.next(label);
  }

  closeAllDropdowns() {
    this.activeDropdownSubject.next(null);
  }
}