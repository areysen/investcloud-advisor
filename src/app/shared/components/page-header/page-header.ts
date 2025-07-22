import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss'
})
export class PageHeaderComponent {
  @Input() height: string = '187px';
  @Input() variant: 'default' | 'dashboard' | 'custom' = 'default';
  
  get headerHeight(): string {
    switch (this.variant) {
      case 'dashboard':
        return '586px';
      case 'default':
        return '187px';
      default:
        return this.height;
    }
  }
}