import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavigationService, MenuItem } from '../../../core/services/navigation';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmMenuComponent, HlmMenuItemDirective, HlmMenuBarComponent, HlmMenuBarItemDirective } from '@spartan-ng/helm/menu';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuBarComponent,
    HlmMenuBarItemDirective,
    NgIconComponent
  ],
  templateUrl: './navigation-menu.html',
  styleUrl: './navigation-menu.scss'
})
export class NavigationMenuComponent {
  menuItems: MenuItem[] = [];

  constructor(
    public navigationService: NavigationService,
    private router: Router
  ) {
    this.menuItems = this.navigationService.navigationConfig;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  isParentActive(item: MenuItem): boolean {
    if (item.children) {
      return item.children.some(child => this.isActive(child.route || ''));
    }
    return false;
  }
}