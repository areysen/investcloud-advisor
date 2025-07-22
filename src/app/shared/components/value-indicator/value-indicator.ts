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
            [class.text-green-600]="showColoredText && value >= 0"
            [class.text-red-600]="showColoredText && value < 0">
        {{ formattedValue }}
      </span>
      <div class="inline-flex items-center justify-center w-6 h-6 rounded-sm"
           [class.bg-green-100]="value >= 0"
           [class.bg-red-100]="value < 0">
        <ng-icon 
          [name]="value >= 0 ? 'lucideChevronUp' : 'lucideChevronDown'"
          size="14"
          [class.text-green-600]="value >= 0"
          [class.text-red-600]="value < 0"
        />
      </div>
    </div>
  `,
  styles: []
})
export class ValueIndicatorComponent {
  @Input() value: number = 0;
  @Input() format: 'currency' | 'number' | 'percent' = 'number';
  @Input() showColoredText = false;
  
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