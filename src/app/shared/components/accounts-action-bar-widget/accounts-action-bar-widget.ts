import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HlmCardDirective } from '../../ui/ui-card-helm/src';
import { HlmButtonDirective } from '../../ui/ui-button-helm/src';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-accounts-action-bar-widget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HlmCardDirective,
    HlmButtonDirective,
    NgIconComponent
  ],
  template: `
    <div hlmCard class="bg-white rounded-lg shadow-sm p-0">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-600">As of</span>
            <div class="relative">
              <input 
                type="text" 
                [value]="asOfDate"
                class="h-9 w-32 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:border-purple-primary focus:outline-none focus:ring-1 focus:ring-purple-primary pr-8"
                readonly
              />
              <ng-icon name="lucideCalendar" size="16" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <button 
              hlmBtn 
              variant="outline" 
              class="text-purple-primary border-purple-primary hover:bg-purple-50"
              (click)="apply.emit()"
            >
              Apply
            </button>
            <button 
              hlmBtn 
              variant="outline" 
              class="text-gray-700 border-gray-300 hover:bg-gray-50"
              (click)="clear.emit()"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AccountsActionBarWidgetComponent {
  @Input() asOfDate = '';
  @Output() apply = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
}