import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardContentDirective,
} from '../../ui/ui-card-helm/src/index';
import {
  HlmTabsComponent,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
  HlmTabsContentDirective,
} from '../../ui/ui-tabs-helm/src/index';
import { NgIconComponent } from '@ng-icons/core';
import { DataTableComponent } from '../data-table/data-table';
import { TableColumn, TableConfig } from '../data-table/data-table.types';

interface Relationship {
  name: string;
  accountCount: number;
  cashBalance: number;
  marketValue: number;
}

interface Account {
  accountName: string;
  accountNumber: string;
  percentOfMV: number;
  marketValue: number;
  unrealizedGL: number;
}

interface AccountGroup {
  groupName: string;
  marketValue: number;
  unrealizedGL: number;
}

interface Client {
  clientName: string;
  marketValue: number;
  numberOfAccounts: number;
}

@Component({
  selector: 'app-accounts-widget',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    NgIconComponent,
    DataTableComponent,
  ],
  templateUrl: './accounts-widget.html',
  styleUrl: './accounts-widget.scss',
})
export class AccountsWidgetComponent {
  activeTab = 'relationships';

  // Clients data
  clientsData: Client[] = [
    {
      clientName: 'Andrew Reid Thomas',
      marketValue: 11928908.15,
      numberOfAccounts: 3
    },
    {
      clientName: 'Michael D. Eskarous',
      marketValue: 17205767.66,
      numberOfAccounts: 13
    },
    {
      clientName: 'Jack McDonald',
      marketValue: 1791286.62,
      numberOfAccounts: 4
    },
    {
      clientName: 'Steve Ellis',
      marketValue: 3159058.87,
      numberOfAccounts: 3
    },
    {
      clientName: 'Mike Villa',
      marketValue: 7150579.82,
      numberOfAccounts: 5
    },
    {
      clientName: 'Juli Duva',
      marketValue: 7758195.34,
      numberOfAccounts: 2
    },
    {
      clientName: 'George Blandon',
      marketValue: 11367739.74,
      numberOfAccounts: 8
    },
    {
      clientName: 'Jesus Gerena',
      marketValue: 7758195.34,
      numberOfAccounts: 2
    },
    {
      clientName: 'Josh Rosen',
      marketValue: 7758195.34,
      numberOfAccounts: 2
    },
    {
      clientName: 'George McKinnon1',
      marketValue: 7758195.34,
      numberOfAccounts: 2
    },
    {
      clientName: 'Amy Harlacker',
      marketValue: 16360234.69,
      numberOfAccounts: 9
    },
    {
      clientName: 'Lou Pellicori',
      marketValue: 23048074.84,
      numberOfAccounts: 3
    },
    {
      clientName: 'Laura Williamson',
      marketValue: 7758195.34,
      numberOfAccounts: 2
    },
    {
      clientName: 'Edward Lowndes',
      marketValue: 7758195.34,
      numberOfAccounts: 2
    },
    {
      clientName: 'Paul Shusted',
      marketValue: 7758195.34,
      numberOfAccounts: 2
    }
  ];

  // Account Groups data
  accountGroupsData: AccountGroup[] = [
    {
      groupName: 'Laura Harley Taxable',
      marketValue: 34139583.69,
      unrealizedGL: 2699185.99
    },
    {
      groupName: 'Laura Harley Tax Deferred',
      marketValue: 3275585.13,
      unrealizedGL: 832203.91
    },
    {
      groupName: 'Laura Harley UMA',
      marketValue: 3142452.46,
      unrealizedGL: 761388.97
    },
    {
      groupName: 'John Smith Taxable',
      marketValue: 3140853.74,
      unrealizedGL: 726573.10
    },
    {
      groupName: 'Hammerson Family Growth',
      marketValue: 1322070.37,
      unrealizedGL: 218034.44
    },
    {
      groupName: 'Wellington Trust Fund',
      marketValue: 28450900.00,
      unrealizedGL: -1250000.00
    },
    {
      groupName: 'Riverside Pension Plan',
      marketValue: 45670230.50,
      unrealizedGL: 3421000.25
    },
    {
      groupName: 'Global Equity Portfolio',
      marketValue: 12890500.00,
      unrealizedGL: -890200.00
    },
    {
      groupName: 'Tech Innovation Fund',
      marketValue: 8760340.00,
      unrealizedGL: 2341000.00
    },
    {
      groupName: 'Healthcare Opportunities',
      marketValue: 6543210.00,
      unrealizedGL: -123456.00
    },
    {
      groupName: 'Emerging Markets Growth',
      marketValue: 15678900.00,
      unrealizedGL: 987650.00
    },
    {
      groupName: 'Fixed Income Stable',
      marketValue: 22345600.00,
      unrealizedGL: -456780.00
    },
    {
      groupName: 'Real Estate Investment',
      marketValue: 18900000.00,
      unrealizedGL: 2100000.00
    },
    {
      groupName: 'Commodities Diversified',
      marketValue: 9870000.00,
      unrealizedGL: -567000.00
    },
    {
      groupName: 'Alternative Strategies',
      marketValue: 11234500.00,
      unrealizedGL: 1234567.00
    }
  ];

  // Accounts data
  accountsData: Account[] = [
    {
      accountName: 'JP Account 3',
      accountNumber: '19163',
      percentOfMV: 0.26142,
      marketValue: 348093375.00,
      unrealizedGL: -12637625.00
    },
    {
      accountName: 'JP Account 2',
      accountNumber: '19163',
      percentOfMV: 0.18163,
      marketValue: 241847000.00,
      unrealizedGL: 8550000.00
    },
    {
      accountName: 'JP Account 1',
      accountNumber: '19163',
      percentOfMV: 0.09882,
      marketValue: 131584000.00,
      unrealizedGL: -2262000.00
    },
    {
      accountName: 'Amy Johnston',
      accountNumber: 'Harley11_A.Johnston',
      percentOfMV: 0.03758,
      marketValue: 50046416.51,
      unrealizedGL: 2499557.57
    },
    {
      accountName: 'Shannon Charitable Trust',
      accountNumber: 'HWM_H10234403',
      percentOfMV: 0.03213,
      marketValue: 42784097.01,
      unrealizedGL: 11762366.29
    },
    {
      accountName: 'John Meriwether',
      accountNumber: 'Harley10_J.Meriwether',
      percentOfMV: 0.01933,
      marketValue: 25736045.00,
      unrealizedGL: 16716020.00
    },
    {
      accountName: 'Thomas Steyer',
      accountNumber: 'Harley10_T.Steyer',
      percentOfMV: 0.01716,
      marketValue: 22846864.26,
      unrealizedGL: 12906471.00
    },
    {
      accountName: 'Ken Griffen',
      accountNumber: 'Harley10_K.Griffen',
      percentOfMV: 0.01497,
      marketValue: 19936090.61,
      unrealizedGL: 7950948.59
    },
    {
      accountName: 'Louis Bacon',
      accountNumber: 'Harley10_L.Bacon',
      percentOfMV: 0.01148,
      marketValue: 15289879.50,
      unrealizedGL: 6785717.50
    },
    {
      accountName: 'A.W. Jones',
      accountNumber: 'Harley10_A.W.Jones',
      percentOfMV: 0.00908,
      marketValue: 12095477.47,
      unrealizedGL: 9200857.88
    },
    {
      accountName: 'Jim Simmons',
      accountNumber: 'Harley10_J.Simmons',
      percentOfMV: 0.00868,
      marketValue: 11562095.83,
      unrealizedGL: 4170415.24
    },
    {
      accountName: 'Laura Harley Ind Investment',
      accountNumber: 'HWM_H10211586_X',
      percentOfMV: 0.00584,
      marketValue: 7772210.12,
      unrealizedGL: 1084499.59
    },
    {
      accountName: 'Robert Wilson',
      accountNumber: '19121',
      percentOfMV: 0.00530,
      marketValue: 7063572.17,
      unrealizedGL: 1937830.76
    },
    {
      accountName: 'Laura Harley Large Cap Growth',
      accountNumber: '19163',
      percentOfMV: 0.00481,
      marketValue: 6399600.39,
      unrealizedGL: 2705724.48
    },
    {
      accountName: 'Marianne Vos',
      accountNumber: 'HWM_H10228605',
      percentOfMV: 0.00397,
      marketValue: 5280529.80,
      unrealizedGL: 1470618.90
    }
  ];

  // Relationships data
  relationshipsData: Relationship[] = [
    {
      name: 'Jones',
      accountCount: 2,
      cashBalance: 866727.72,
      marketValue: 7758195.34,
    },
    {
      name: 'Kornblum',
      accountCount: 2,
      cashBalance: 866727.72,
      marketValue: 7758195.34,
    },
    {
      name: 'Cook',
      accountCount: 2,
      cashBalance: 866727.72,
      marketValue: 7758195.34,
    },
    {
      name: 'Musk',
      accountCount: 1,
      cashBalance: 162608.44,
      marketValue: 1869359.82,
    },
    {
      name: 'Riot',
      accountCount: 2,
      cashBalance: 866727.72,
      marketValue: 7758195.34,
    },
    {
      name: 'Wise',
      accountCount: 1,
      cashBalance: 538031.0,
      marketValue: 3159058.87,
    },
    {
      name: 'Heinz',
      accountCount: 4,
      cashBalance: 1595464.82,
      marketValue: 13494086.26,
    },
    {
      name: 'Smith',
      accountCount: 2,
      cashBalance: 866727.72,
      marketValue: 7758195.34,
    },
    {
      name: 'Bailey',
      accountCount: 2,
      cashBalance: 866727.72,
      marketValue: 7758195.34,
    },
    {
      name: 'Devlin',
      accountCount: 2,
      cashBalance: 866727.72,
      marketValue: 7758195.34,
    },
    {
      name: 'Harley',
      accountCount: 1,
      cashBalance: 289543.0,
      marketValue: 2700222.28,
    },
    {
      name: 'Reysen',
      accountCount: 5,
      cashBalance: 3067969.3,
      marketValue: 19516872.92,
    },
    {
      name: 'Segreto',
      accountCount: 1,
      cashBalance: -136375.96,
      marketValue: 4170712.81,
    },
    {
      name: 'Ballard',
      accountCount: 2,
      cashBalance: 209394.39,
      marketValue: 2377482.96,
    },
    {
      name: 'Galager',
      accountCount: 2,
      cashBalance: 1948298.52,
      marketValue: 6197831.57,
    },
  ];

  relationshipsColumns: TableColumn<Relationship>[] = [
    {
      key: 'name',
      label: 'Relationship Name',
      type: 'link',
      sortable: true,
      filterable: true,
    },
    {
      key: 'marketValue',
      label: 'Market Value',
      type: 'currency',
      sortable: true,
      filterable: true,
      align: 'right',
    },
    {
      key: 'cashBalance',
      label: 'Cash Balance',
      type: 'currency',
      sortable: true,
      filterable: true,
      align: 'right',
    },
    {
      key: 'accountCount',
      label: '# of Accounts',
      type: 'number',
      sortable: true,
      filterable: true,
      align: 'right',
    },
  ];

  accountsColumns: TableColumn<Account>[] = [
    {
      key: 'accountName',
      label: 'Account Name',
      type: 'link',
      sortable: true,
      filterable: true,
    },
    {
      key: 'accountNumber',
      label: 'Account Number',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      key: 'percentOfMV',
      label: '% of MV',
      type: 'percent',
      sortable: true,
      filterable: true,
      align: 'right',
    },
    {
      key: 'marketValue',
      label: 'Market Value',
      type: 'currency',
      sortable: true,
      filterable: true,
      align: 'right',
    },
    {
      key: 'unrealizedGL',
      label: 'Unrealized G/L',
      type: 'custom',
      sortable: true,
      filterable: true,
      align: 'right',
    },
  ];

  accountGroupsColumns: TableColumn<AccountGroup>[] = [
    {
      key: 'groupName',
      label: 'Account Group Name',
      type: 'link',
      sortable: true,
      filterable: true,
    },
    {
      key: 'marketValue',
      label: 'Market Value',
      type: 'currency',
      sortable: true,
      filterable: true,
      align: 'right',
    },
    {
      key: 'unrealizedGL',
      label: 'Unrealized G/L',
      type: 'custom',
      sortable: true,
      filterable: true,
      align: 'right',
    },
  ];

  clientsColumns: TableColumn<Client>[] = [
    {
      key: 'clientName',
      label: 'Client Name',
      type: 'link',
      sortable: true,
      filterable: true,
    },
    {
      key: 'marketValue',
      label: 'Market Value',
      type: 'currency',
      sortable: true,
      filterable: true,
      align: 'right',
    },
    {
      key: 'numberOfAccounts',
      label: '# of Accounts',
      type: 'number',
      sortable: true,
      filterable: true,
      align: 'center',
    },
    {
      key: 'becomeUser',
      label: 'Become User',
      type: 'action',
      icon: 'lucideUserCheck',
      align: 'center',
      width: '120px',
    },
  ];

  tableConfig: TableConfig = {
    pageSize: 5,
    showPagination: true,
    showFilter: true,
    filterPlaceholder: '',
    emptyMessage: 'No relationships found',
    initialSort: {
      active: 'name',
      direction: 'asc',
    },
    showAllToggle: false,
  };

  onHeaderClick(event: Event) {
    event.preventDefault();
    console.log('Accounts title clicked');
    // Implement navigation to accounts page
  }

  onTabChange(tab: string) {
    this.activeTab = tab;
    console.log('Tab changed to:', tab);
  }

  onRelationshipClick(relationship: Relationship) {
    console.log('Relationship clicked:', relationship);
    // Implement navigation to relationship details
  }

  onProfileClick(action: { action: string; row: Relationship }) {
    console.log('Profile clicked for:', action.row.name);
    // Implement profile view
  }

  onAccountClick(account: Account) {
    console.log('Account clicked:', account);
    // Implement navigation to account details
  }

  onAccountGroupClick(accountGroup: AccountGroup) {
    console.log('Account group clicked:', accountGroup);
    // Implement navigation to account group details
  }

  onClientClick(client: Client) {
    console.log('Client clicked:', client);
    // Implement navigation to client details
  }

  onBecomeUserClick(event: { action: string; row: Client }) {
    console.log('Become user clicked for:', event.row.clientName);
    // Implement become user functionality
  }
}
