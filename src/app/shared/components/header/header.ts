import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu';
import { NavigationService } from '../../../core/services/navigation';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmAvatarComponent, HlmAvatarImageDirective, HlmAvatarFallbackDirective } from '@spartan-ng/helm/avatar';
import { HlmBadgeDirective } from '@spartan-ng/helm/badge';
import { NgIconComponent } from '@ng-icons/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmMenuComponent, HlmMenuItemDirective, HlmMenuSeparatorComponent } from '@spartan-ng/helm/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavigationMenuComponent,
    HlmButtonDirective,
    HlmAvatarComponent,
    HlmAvatarImageDirective,
    HlmAvatarFallbackDirective,
    HlmBadgeDirective,
    NgIconComponent,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuSeparatorComponent
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  selectedTheme = 'light';

  constructor(public navigationService: NavigationService) {}

  handleMenuAction(action?: string) {
    if (action === 'logout') {
      // Handle logout
      console.log('Logout clicked');
    }
  }

  handleThemeChange(theme: string) {
    this.selectedTheme = theme;
    // Handle theme change
    console.log('Theme changed to:', theme);
  }
}