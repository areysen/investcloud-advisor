# InvestCloud Advisor Dashboard - Claude AI Development Guidelines

## Project Overview
This is an Angular 20 application using Spartan UI components (built on top of Angular CDK) with Tailwind CSS for styling. The project follows a design system from Figma and emphasizes reusability and modern Angular best practices.

## Key Development Principles

### 1. Component Architecture
- **Leverage Spartan UI First**: Always use Spartan UI components before creating custom solutions
- **Standalone Components**: All components should be standalone (no NgModules)
- **Smart vs Dumb Components**: Separate business logic (smart) from presentation (dumb) components
- **Composition over Inheritance**: Use component composition patterns instead of class inheritance

### 2. Styling Guidelines
- **Tailwind First**: Use Tailwind utility classes before writing custom CSS
- **Avoid !important**: Never use !important unless absolutely necessary (document why if used)
- **CSS Specificity**: Use proper CSS cascade and specificity instead of !important
- **Global Overrides**: Place in `src/styles.scss` or dedicated override files in `src/app/shared/styles/`
- **Component Styles**: Keep component-specific styles minimal, prefer Tailwind classes

### 3. Design System
- **Typography**: Red Hat Text font family (variable weight 300-700)
- **Primary Color**: #6a3460 (purple)
- **Card Shadow**: 0px 2px 6px 1px rgba(0, 0, 0, 0.03)
- **Base Card Styling**: No borders, just shadow
- **Button Heights**: 37px standard
- **Consistent Spacing**: Follow 8px grid system

### 4. Code Quality Standards

#### Before Committing:
1. **Build Check**: `npm run build` - Ensure no build errors
2. **Type Check**: TypeScript strict mode is enabled - ensure no type errors
3. **ESLint**: Currently not configured but should be added with `ng add angular-eslint`
4. **Test**: `npm test` - Run unit tests

#### File Organization:
```
src/
├── app/
│   ├── core/          # Singleton services, guards, interceptors
│   ├── features/      # Feature modules (lazy loaded)
│   ├── shared/        # Shared components, directives, pipes
│   │   ├── components/
│   │   ├── styles/    # Global style overrides
│   │   └── ui/        # Spartan UI components
│   └── app.ts         # Root component
```

### 5. Angular Best Practices

#### Component Development:
- Use `ChangeDetectionStrategy.OnPush` where possible
- Implement `OnDestroy` and clean up subscriptions
- Use `DestroyRef` and `takeUntilDestroyed()` for RxJS cleanup
- Prefer signals over traditional state management where appropriate

#### Template Best Practices:
- Use `@if`, `@for`, `@switch` control flow (not *ngIf, *ngFor)
- Avoid complex logic in templates
- Use pipes for data transformation
- Implement proper accessibility (ARIA labels, roles)

#### Service Guidelines:
- Services should be `providedIn: 'root'` by default
- Use proper dependency injection
- Implement error handling and loading states
- Cache data appropriately

### 6. Spartan UI Integration

#### Component Usage:
```typescript
// Always import from Spartan UI first
import { HlmCardDirective, HlmCardHeaderDirective } from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

// Use directives on native elements
<div hlmCard class="bg-white rounded-lg shadow-sm">
  <div hlmCardHeader class="px-6 py-5">
    <h3 hlmCardTitle class="text-base">Title</h3>
  </div>
</div>
```

#### Available Spartan Components:
- Cards: `hlmCard`, `hlmCardHeader`, `hlmCardTitle`, `hlmCardContent`, `hlmCardFooter`
- Buttons: `hlmBtn` with variants: default, outline, ghost, destructive
- Tabs: `hlm-tabs`, `hlm-tabs-list`, `hlmTabsTrigger`, `hlmTabsContent`
- Icons: Use `ng-icon` with lucide icons
- Menus: `hlm-menu`, `hlmMenuTrigger`, `hlmMenuItem`
- Badges: `hlmBadge` with variants
- Checkboxes: `hlm-checkbox`

### 7. Common Patterns

#### Card Widget Pattern:
```typescript
@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective
  ],
  template: `
    <div hlmCard class="bg-white rounded-lg shadow-sm p-0">
      <div hlmCardHeader class="flex items-center justify-between px-6 py-5">
        <h3 hlmCardTitle>Widget Title</h3>
      </div>
      <div hlmCardContent class="px-6 pb-6">
        <!-- Content -->
      </div>
    </div>
  `
})
```

#### Tab Implementation:
```typescript
// Use Spartan tabs with custom styling
<hlm-tabs [tab]="activeTab" class="w-full">
  <hlm-tabs-list class="w-full">
    <button hlmTabsTrigger="tab1">Tab 1</button>
    <button hlmTabsTrigger="tab2">Tab 2</button>
  </hlm-tabs-list>
  <div hlmTabsContent="tab1">Content 1</div>
  <div hlmTabsContent="tab2">Content 2</div>
</hlm-tabs>
```

### 8. Performance Considerations
- Lazy load feature modules
- Use trackBy functions in @for loops
- Implement virtual scrolling for large lists
- Optimize bundle size with tree shaking
- Use OnPush change detection strategy

### 9. Testing Requirements
- Write unit tests for all services and complex logic
- Component tests should cover user interactions
- Use TestBed for component testing
- Mock external dependencies
- Aim for >80% code coverage

### 10. Git Workflow
- Never commit directly unless explicitly asked
- Write clear, descriptive commit messages
- Include ticket numbers if applicable
- Run all checks before committing

## Project-Specific Notes

### Current Dependencies:
- Angular 20.1.0
- Spartan UI (latest)
- Tailwind CSS 3.x
- Lucide Icons (via ng-icon)
- Chart.js (for data visualization)

### Environment Setup:
- Node.js 18+ required
- Use npm (not yarn or pnpm)
- Development server: `npm start` (runs on http://localhost:4200)

### Known Issues/Workarounds:
1. Sass @import deprecation - Use @use instead or sass-migrator tool
2. Spartan tabs require [tab] binding, not [(value)]
3. Some Spartan components use flex with gap - override when needed

### Future Improvements:
1. Add ESLint configuration: `ng add angular-eslint`
2. Configure Prettier for consistent formatting
3. Add pre-commit hooks with husky
4. Implement comprehensive error handling
5. Add loading states and skeletons
6. Implement proper state management (NgRx or similar)

## Quick Commands
```bash
# Development
npm start              # Start dev server
npm run build         # Build for production
npm test              # Run unit tests

# Code Quality (to be added)
ng add angular-eslint # Add linting
ng lint               # Run linter (after setup)

# Utilities
npm install           # Install dependencies
npm update            # Update dependencies
```

## Important Reminders
1. Always check existing patterns before implementing new ones
2. Reuse components and styles - avoid duplication
3. Follow the design system strictly
4. Ask for clarification if requirements are unclear
5. Document complex logic with comments
6. Keep accessibility in mind (WCAG 2.1 AA compliance)
7. Test on different screen sizes (responsive design)

## Additional Documentation
- `.claude/angular-best-practices.md` - Detailed Angular 20 patterns and examples
- `.claude/quick-reference.md` - Quick lookup for common tasks and patterns
- `src/app/shared/styles/README.md` - CSS architecture and styling guidelines

## Contact & Resources
- Figma Designs: [Link provided by user]
- Angular Docs: https://angular.dev
- Spartan UI Docs: https://www.spartan.ng
- Tailwind CSS Docs: https://tailwindcss.com