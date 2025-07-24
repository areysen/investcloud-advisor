import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-value-indicator',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  template: `
    <div class="flex items-center justify-end gap-2">
      <span [class.text-inherit]="!showColoredText"
            [class.text-green-600]="showColoredText && effectiveIsPositive"
            [class.text-red-600]="showColoredText && !effectiveIsPositive">
        {{ formattedValue }}
      </span>
      @if (showArrow) {
        <div class="inline-flex items-center justify-center w-6 h-6 rounded-sm"
             [class.bg-green-100]="effectiveIsPositive"
             [class.bg-red-100]="!effectiveIsPositive">
          <ng-icon 
            [name]="effectiveIsPositive ? 'lucideChevronUp' : 'lucideChevronDown'"
            size="14"
            [class.text-green-600]="effectiveIsPositive"
            [class.text-red-600]="!effectiveIsPositive"
          />
        </div>
      }
    </div>
  `,
  styles: []
})
export class ValueIndicatorComponent {
  @Input() value: number = 0;
  @Input() format: 'currency' | 'number' | 'percent' = 'number';
  @Input() showColoredText = false;
  @Input() showArrow = true;
  @Input() isPositive?: boolean;
  
  get effectiveIsPositive(): boolean {
    return this.isPositive !== undefined ? this.isPositive : this.value >= 0;
  }
  
  get formattedValue(): string {
    switch (this.format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(this.value);
      case 'percent':
        return new Intl.NumberFormat('en-US', {
          style: 'percent',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(this.value);
      default:
        return new Intl.NumberFormat('en-US').format(this.value);
    }
  }
}