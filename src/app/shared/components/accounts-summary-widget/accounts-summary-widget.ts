import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmCardDirective } from '../../ui/ui-card-helm/src';

@Component({
  selector: 'app-accounts-summary-widget',
  standalone: true,
  imports: [CommonModule, HlmCardDirective],
  template: `
    <div class="grid grid-cols-3 gap-5">
      <div hlmCard class="bg-white rounded-lg shadow-sm p-0">
        <div class="px-6 py-5">
          <p class="text-sm text-gray-600 mb-2">Total Market Value</p>
          <p class="text-2xl font-semibold">\${{ totalMarketValue | number:'1.0-0' }}</p>
        </div>
      </div>
      
      <div hlmCard class="bg-white rounded-lg shadow-sm p-0">
        <div class="px-6 py-5">
          <p class="text-sm text-gray-600 mb-2">Total Cost</p>
          <p class="text-2xl font-semibold">\${{ totalCost | number:'1.0-0' }}</p>
        </div>
      </div>
      
      <div hlmCard class="bg-white rounded-lg shadow-sm p-0">
        <div class="px-6 py-5">
          <p class="text-sm text-gray-600 mb-2">Unrealized G/L</p>
          <p class="text-2xl font-semibold">\${{ unrealizedGL | number:'1.0-0' }}</p>
          <p class="text-xs text-gray-500 mt-1">As of {{ asOfDate }}</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AccountsSummaryWidgetComponent {
  @Input() totalMarketValue = 0;
  @Input() totalCost = 0;
  @Input() unrealizedGL = 0;
  @Input() asOfDate = '';
}