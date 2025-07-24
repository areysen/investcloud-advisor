import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../data-table/data-table';
import { HlmCardDirective } from '../../ui/ui-card-helm/src';
import { HlmButtonDirective } from '../../ui/ui-button-helm/src';
import { NgIconComponent } from '@ng-icons/core';

export interface Account {
  id: string;
  accountName: string;
  accountNumber: string;
  percentOfMV: number;
  marketValue: number;
  totalCost: number;
  percentUnrealizedGL: number;
  unrealizedGL: number;
  unrealizedGLDirection: 'up' | 'down';
}

@Component({
  selector: 'app-accounts-table-widget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DataTableComponent,
    HlmCardDirective,
    HlmButtonDirective,
    NgIconComponent
  ],
  template: `
    <div hlmCard class="bg-white rounded-lg shadow-sm p-0">
      <!-- Tabs -->
      <div class="border-b border-gray-200">
        <div class="flex">
          <button 
            class="px-6 py-3 text-sm font-medium border-b-2 transition-colors"
            [class.border-purple-primary]="activeTab === 'accounts'"
            [class.text-purple-primary]="activeTab === 'accounts'"
            [class.border-transparent]="activeTab !== 'accounts'"
            [class.text-gray-600]="activeTab !== 'accounts'"
            (click)="activeTab = 'accounts'; tabChange.emit(activeTab)"
          >
            Accounts
          </button>
          <button 
            class="px-6 py-3 text-sm font-medium border-b-2 transition-colors"
            [class.border-purple-primary]="activeTab === 'groups'"
            [class.text-purple-primary]="activeTab === 'groups'"
            [class.border-transparent]="activeTab !== 'groups'"
            [class.text-gray-600]="activeTab !== 'groups'"
            (click)="activeTab = 'groups'; tabChange.emit(activeTab)"
          >
            Account Groups
          </button>
        </div>
      </div>
      
      <!-- Query Bar -->
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <label class="text-sm font-medium text-gray-700">Saved queries</label>
            <select 
              class="h-9 w-56 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:border-purple-primary focus:outline-none focus:ring-1 focus:ring-purple-primary"
              [(ngModel)]="selectedQuery" 
              (ngModelChange)="queryChange.emit($event)"
            >
              <option value="">Select</option>
              <option value="all">All Accounts</option>
              <option value="high-value">High Value Accounts</option>
              <option value="positive-returns">Positive Returns</option>
            </select>
          </div>
          
          <p class="text-sm text-gray-500">Drag a column here to group by that column</p>
        </div>
      </div>
      
      <!-- Table Actions Bar -->
      <div class="px-6 py-3 border-b border-gray-200 flex items-center justify-between">
        <div></div>
        <div class="flex items-center gap-3">
          <button 
            hlmBtn 
            variant="ghost" 
            size="sm" 
            class="text-gray-600 hover:text-gray-800"
            (click)="export.emit()"
          >
            <ng-icon name="lucideDownload" size="16" class="mr-1" />
            Export
          </button>
          <button 
            hlmBtn 
            variant="ghost" 
            size="sm" 
            class="text-gray-600 hover:text-gray-800"
            (click)="editColumns.emit()"
          >
            <ng-icon name="lucideEdit2" size="16" class="mr-1" />
            Edit Columns
          </button>
        </div>
      </div>
      
      <!-- Data Table -->
      <app-data-table
        [data]="accounts"
        [columns]="columns"
        [config]="tableConfig"
        (rowClick)="rowClick.emit($event)"
        (actionClick)="actionClick.emit($event)"
        class="accounts-table"
      >
        <ng-content></ng-content>
      </app-data-table>
    </div>
  `,
  styles: []
})
export class AccountsTableWidgetComponent {
  @Input() accounts: Account[] = [];
  @Input() columns: any[] = [];
  @Input() tableConfig: any = {};
  @Input() selectedQuery = '';
  
  @Output() tabChange = new EventEmitter<string>();
  @Output() queryChange = new EventEmitter<string>();
  @Output() export = new EventEmitter<void>();
  @Output() editColumns = new EventEmitter<void>();
  @Output() rowClick = new EventEmitter<Account>();
  @Output() actionClick = new EventEmitter<{ action: string; row: Account }>();
  
  activeTab = 'accounts';
}