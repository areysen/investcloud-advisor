import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCardContentDirective,
} from '../../ui/ui-card-helm/src';
import { HlmTabsComponent, HlmTabsListComponent, HlmTabsTriggerDirective, HlmTabsContentDirective } from '../../ui/ui-tabs-helm/src';
import { DataTableComponent } from '../data-table/data-table';
import { TableColumn, TableConfig } from '../data-table/data-table.types';

interface Message {
  id: string;
  subject: string;
  from: string;
  date: string;
  status?: 'read' | 'unread';
}

interface Note {
  id: string;
  title: string;
  createdBy: string;
  createdDate: string;
  lastModified: string;
  category: string;
  attachments: number;
}

interface Meeting {
  id: string;
  title: string;
  attendees: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface Document {
  id: string;
  name: string;
  type: string;
  sharedBy: string;
  sharedDate: string;
  size: string;
}

@Component({
  selector: 'app-interactions-widget',
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
    DataTableComponent,
  ],
  template: `
    <div hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Interactions</h3>
      </div>
      
      <div hlmCardContent>
        <div class="tabs-with-border">
          <hlm-tabs [tab]="activeTab" (tabActivated)="activeTab = $event">
            <hlm-tabs-list>
              <button hlmTabsTrigger="secure-messaging">Secure Messaging</button>
              <button hlmTabsTrigger="notes">Notes</button>
              <button hlmTabsTrigger="meetings">Meetings</button>
              <button hlmTabsTrigger="documents">Documents</button>
            </hlm-tabs-list>
            
            <!-- Secure Messaging Tab -->
            <div class="p-0" hlmTabsContent="secure-messaging" *ngIf="activeTab === 'secure-messaging'">
              <!-- Sub-tabs for messaging -->
              <div class="px-4 py-3 border-b">
                <div class="flex justify-center">
                  <div class="inline-flex rounded-full bg-gray-100 p-1">
                    <button
                      *ngFor="let subTab of messagingSubTabs"
                      (click)="activeMessagingSubTab = subTab.id"
                      [class]="subTabButtonClass(subTab.id)"
                      class="px-4 py-1.5 text-sm font-medium rounded-full transition-colors"
                    >
                      {{ subTab.label }}
                    </button>
                  </div>
                </div>
              </div>
              
              <app-data-table
                [data]="getFilteredMessages()"
                [columns]="messageColumns"
                [config]="messageTableConfig"
                (rowClick)="onMessageClick($event)"
              ></app-data-table>
            </div>
            
            <!-- Notes Tab -->
            <div class="p-0" hlmTabsContent="notes" *ngIf="activeTab === 'notes'">
              <app-data-table
                [data]="notesData"
                [columns]="notesColumns"
                [config]="notesTableConfig"
                (rowClick)="onNoteClick($event)"
              ></app-data-table>
            </div>
            
            <!-- Meetings Tab -->
            <div class="p-0" hlmTabsContent="meetings" *ngIf="activeTab === 'meetings'">
              <div class="px-6 py-8 text-center text-gray-500">
                Meetings content coming soon
              </div>
            </div>
            
            <!-- Documents Tab -->
            <div class="p-0" hlmTabsContent="documents" *ngIf="activeTab === 'documents'">
              <div class="px-6 py-8 text-center text-gray-500">
                Documents content coming soon
              </div>
            </div>
          </hlm-tabs>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractionsWidgetComponent {
  activeTab = 'secure-messaging';
  activeMessagingSubTab = 'received';

  messagingSubTabs = [
    { id: 'received', label: 'Received' },
    { id: 'sent', label: 'Sent' },
    { id: 'draft', label: 'Draft' }
  ];

  // Messages data
  receivedMessages: Message[] = [
    { id: '1', subject: 'College Savings', from: 'lharley@gmail.com', date: '3/1/2023', status: 'read' },
    { id: '2', subject: 'Roth IRA Transfer', from: 'gmarshall@gmail.com', date: '2/24/2023', status: 'unread' },
    { id: '3', subject: 'Dividend Reinvesting', from: 'jtaylor@gmail.com', date: '2/11/2023', status: 'read' },
    { id: '4', subject: 'Add my son to have view permissions', from: 'cgreene@gmail.com', date: '1/21/2023', status: 'read' },
    { id: '5', subject: 'Q1 2023 Market Outlook', from: 'mcarrol@gmail.com', date: '1/19/2023', status: 'unread' },
  ];

  sentMessages: Message[] = [
    { id: '6', subject: 'Re: Portfolio Update', from: 'advisor@investcloud.com', date: '3/15/2023' },
    { id: '7', subject: 'Tax Documents Ready', from: 'advisor@investcloud.com', date: '2/28/2023' },
    { id: '8', subject: 'Investment Strategy Review', from: 'advisor@investcloud.com', date: '2/10/2023' },
  ];

  draftMessages: Message[] = [
    { id: '9', subject: 'Draft: Q2 Market Analysis', from: 'advisor@investcloud.com', date: '3/20/2023' },
    { id: '10', subject: 'Draft: Account Performance Review', from: 'advisor@investcloud.com', date: '3/18/2023' },
  ];

  // Table columns
  messageColumns: TableColumn<Message>[] = [
    {
      key: 'subject',
      label: 'Subject',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      key: 'from',
      label: 'From',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      key: 'date',
      label: 'Date',
      type: 'text',
      sortable: true,
      filterable: true,
      align: 'right',
    },
  ];

  // Table config
  messageTableConfig: TableConfig = {
    pageSize: 5,
    showPagination: true,
    showFilter: true,
    filterPlaceholder: 'Search messages...',
    emptyMessage: 'No messages found',
    initialSort: {
      active: 'date',
      direction: 'desc',
    },
    showAllToggle: false,
  };

  getFilteredMessages(): Message[] {
    switch (this.activeMessagingSubTab) {
      case 'received':
        return this.receivedMessages;
      case 'sent':
        return this.sentMessages;
      case 'draft':
        return this.draftMessages;
      default:
        return [];
    }
  }

  subTabButtonClass(tabId: string): string {
    return this.activeMessagingSubTab === tabId
      ? 'bg-white text-gray-900 shadow-sm'
      : 'text-gray-600 hover:text-gray-900';
  }

  onMessageClick(message: Message) {
    console.log('Message clicked:', message);
    // Implement message details view
  }

  // Notes data
  notesData: Note[] = [
    {
      id: '1',
      title: 'Laura Harley - Estate Planning Review',
      createdBy: 'Sam Johnson',
      createdDate: '3/15/2023',
      lastModified: '3/18/2023',
      category: 'Estate Planning',
      attachments: 3
    },
    {
      id: '2',
      title: 'Q1 2023 Portfolio Performance Analysis',
      createdBy: 'Sam Johnson',
      createdDate: '3/10/2023',
      lastModified: '3/12/2023',
      category: 'Performance Review',
      attachments: 1
    },
    {
      id: '3',
      title: 'Tax Loss Harvesting Opportunities',
      createdBy: 'Mike Chen',
      createdDate: '3/5/2023',
      lastModified: '3/5/2023',
      category: 'Tax Strategy',
      attachments: 0
    },
    {
      id: '4',
      title: 'Meeting Notes - Harley Family Trust',
      createdBy: 'Sam Johnson',
      createdDate: '2/28/2023',
      lastModified: '3/1/2023',
      category: 'Meeting Notes',
      attachments: 2
    },
    {
      id: '5',
      title: 'Investment Strategy Update - Tech Sector',
      createdBy: 'Emily Rodriguez',
      createdDate: '2/20/2023',
      lastModified: '2/25/2023',
      category: 'Investment Strategy',
      attachments: 4
    },
    {
      id: '6',
      title: 'Risk Assessment - Alternative Investments',
      createdBy: 'Sam Johnson',
      createdDate: '2/15/2023',
      lastModified: '2/18/2023',
      category: 'Risk Management',
      attachments: 1
    },
    {
      id: '7',
      title: 'Client Onboarding - Wellington Trust',
      createdBy: 'Mike Chen',
      createdDate: '2/10/2023',
      lastModified: '2/12/2023',
      category: 'Client Onboarding',
      attachments: 5
    },
    {
      id: '8',
      title: 'ESG Investment Options Research',
      createdBy: 'Emily Rodriguez',
      createdDate: '2/5/2023',
      lastModified: '2/8/2023',
      category: 'Research',
      attachments: 2
    }
  ];

  // Notes table columns
  notesColumns: TableColumn<Note>[] = [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      key: 'category',
      label: 'Category',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      key: 'createdBy',
      label: 'Created By',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      key: 'lastModified',
      label: 'Last Modified',
      type: 'text',
      sortable: true,
      filterable: true,
      align: 'right',
    },
    {
      key: 'attachments',
      label: 'Attachments',
      type: 'number',
      sortable: true,
      filterable: false,
      align: 'center',
    },
  ];

  // Notes table config
  notesTableConfig: TableConfig = {
    pageSize: 5,
    showPagination: true,
    showFilter: true,
    filterPlaceholder: 'Search notes...',
    emptyMessage: 'No notes found',
    initialSort: {
      active: 'lastModified',
      direction: 'desc',
    },
    showAllToggle: false,
  };

  onNoteClick(note: Note) {
    console.log('Note clicked:', note);
    // Implement note details view
  }
}