import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HlmInputDirective } from '../../ui/ui-input-helm/src/lib/hlm-input.directive';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';

@Component({
  selector: 'app-welcome-widget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HlmInputDirective,
    NgIconComponent
  ],
  providers: [
    provideIcons({ lucideSearch })
  ],
  templateUrl: './welcome-widget.html',
  styleUrl: './welcome-widget.scss'
})
export class WelcomeWidgetComponent {
  @Input() userName: string = 'User';
  @Input() lastLoginDate: string = '';
  @Output() searchChange = new EventEmitter<string>();
  
  searchQuery: string = '';
  
  onSearchChange() {
    this.searchChange.emit(this.searchQuery);
  }
}