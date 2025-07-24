import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';
import { HlmButtonDirective } from '../../shared/ui/ui-button-helm/src';
import { NgIconComponent } from '@ng-icons/core';
import { AccountsSummaryWidgetComponent } from '../../shared/components/accounts-summary-widget/accounts-summary-widget';
import { AccountsActionBarWidgetComponent } from '../../shared/components/accounts-action-bar-widget/accounts-action-bar-widget';
import { AccountsTableWidgetComponent, Account } from '../../shared/components/accounts-table-widget/accounts-table-widget';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    HlmButtonDirective,
    NgIconComponent,
    AccountsSummaryWidgetComponent,
    AccountsActionBarWidgetComponent,
    AccountsTableWidgetComponent
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit {
  searchQuery = '';
  selectedQuery = '';
  
  // Summary data
  totalMarketValue = 983843054;
  totalCost = 944124300;
  unrealizedGL = 38164246;
  asOfDate = '03/15/2023';
  activeTab = 'accounts';
  
  // Table configuration
  tableConfig = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    showPagination: true,
    showFilter: false, // We have custom filters
    emptyMessage: 'No accounts found'
  };
  
  // Table columns configuration
  columns = [
    { key: 'accountName', label: 'Account Name', type: 'text' as const, sortable: true },
    { key: 'accountNumber', label: 'Account Number', type: 'text' as const, sortable: true },
    { key: 'percentOfMV', label: '% of MV', type: 'percent' as const, sortable: true, align: 'right' as const },
    { key: 'marketValue', label: 'Market Value ↓', type: 'currency' as const, sortable: true, align: 'right' as const },
    { key: 'totalCost', label: 'Total Cost', type: 'currency' as const, sortable: true, align: 'right' as const },
    { key: 'percentUnrealizedGL', label: '% Unrealized G/L', type: 'percent' as const, sortable: true, align: 'right' as const },
    { key: 'unrealizedGLTemplate', label: 'Unrealized G/L', type: 'custom' as const, sortable: true, align: 'right' as const },
    { key: 'actions', label: 'Action Center', type: 'custom' as const, sortable: false, align: 'center' as const }
  ];
  
  // Mock data matching the Figma design
  accounts: Account[] = [
    { 
      id: '1', 
      accountName: 'Shannon Charitable Trust', 
      accountNumber: '10234403',
      percentOfMV: 64.90,
      marketValue: 34139583.69,
      totalCost: 31440397.70,
      percentUnrealizedGL: 36.10,
      unrealizedGL: 2699185.99,
      unrealizedGLDirection: 'up'
    },
    { 
      id: '2', 
      accountName: 'Frederick Family Trust', 
      accountNumber: '10233602',
      percentOfMV: 6.20,
      marketValue: 3275585.13,
      totalCost: 2777068.23,
      percentUnrealizedGL: 35.40,
      unrealizedGL: 832203.91,
      unrealizedGLDirection: 'up'
    },
    { 
      id: '3', 
      accountName: 'Peter Sagan', 
      accountNumber: '10234404',
      percentOfMV: 6.02,
      marketValue: 3142452.46,
      totalCost: 2415879.36,
      percentUnrealizedGL: 30.90,
      unrealizedGL: 761388.97,
      unrealizedGLDirection: 'up'
    },
    { 
      id: '4', 
      accountName: 'Marianne Vos', 
      accountNumber: '10228605',
      percentOfMV: 6.00,
      marketValue: 3140853.74,
      totalCost: 2308649.83,
      percentUnrealizedGL: 30.40,
      unrealizedGL: 726573.10,
      unrealizedGLDirection: 'up'
    },
    { 
      id: '5', 
      accountName: 'Hammerson Family Trust', 
      accountNumber: '10235102',
      percentOfMV: 5.50,
      marketValue: 2913688.48,
      totalCost: 2152299.51,
      percentUnrealizedGL: 30.10,
      unrealizedGL: 498516.90,
      unrealizedGLDirection: 'up'
    },
    { 
      id: '6', 
      accountName: 'Pinole Valley School District', 
      accountNumber: '10228603',
      percentOfMV: 2.50,
      marketValue: 1322070.37,
      totalCost: 1253744.87,
      percentUnrealizedGL: 28.70,
      unrealizedGL: 218034.44,
      unrealizedGLDirection: 'up'
    },
    { 
      id: '7', 
      accountName: 'El Cerrito School District', 
      accountNumber: '10233603',
      percentOfMV: 2.30,
      marketValue: 1202785.21,
      totalCost: 1432412.43,
      percentUnrealizedGL: 18.00,
      unrealizedGL: 122790.90,
      unrealizedGLDirection: 'down'
    },
    { 
      id: '8', 
      accountName: 'IRA FBO Jim Simmons', 
      accountNumber: '10235101',
      percentOfMV: 1.90,
      marketValue: 977174.48,
      totalCost: 759140.04,
      percentUnrealizedGL: 8.60,
      unrealizedGL: 108945.99,
      unrealizedGLDirection: 'up'
    },
    { 
      id: '9', 
      accountName: 'Jennifer Jordan', 
      accountNumber: '10233605',
      percentOfMV: 1.64,
      marketValue: 840614.63,
      totalCost: 862819.81,
      percentUnrealizedGL: 5.50,
      unrealizedGL: 68325.50,
      unrealizedGLDirection: 'down'
    },
    { 
      id: '10', 
      accountName: 'IRA FBO Ken Griffen', 
      accountNumber: '10243501',
      percentOfMV: 1.00,
      marketValue: 519891.58,
      totalCost: 397100.68,
      percentUnrealizedGL: 2.60,
      unrealizedGL: 5662.50,
      unrealizedGLDirection: 'up'
    }
  ];
  
  ngOnInit() {
    // Data table will handle filtering internally, but we could implement custom filtering if needed
  }
  
  applyFilters() {
    // Custom filter logic if needed
    console.log('Applying filters:', this.searchQuery, this.selectedQuery);
  }
  
  onRowClick(account: Account) {
    console.log('Account clicked:', account);
    // Navigate to account details
  }
  
  onAction(data: { action: string; row: Account }) {
    console.log('Action:', data.action, 'Account:', data.row);
    // Handle account actions
  }
  
  refreshData() {
    console.log('Refreshing accounts data...');
    // Implement data refresh logic
  }
  
  clearFilters() {
    this.searchQuery = '';
    this.selectedQuery = '';
    this.applyFilters();
  }
  
  onTabChange(tab: string) {
    console.log('Tab changed to:', tab);
    // Handle tab change
  }
  
  exportData() {
    console.log('Exporting data...');
    // Implement export functionality
  }
  
  editColumns() {
    console.log('Edit columns...');
    // Implement column editing
  }
}