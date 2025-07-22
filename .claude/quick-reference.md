# Quick Reference Guide

## Essential Commands
```bash
npm start              # Start dev server (http://localhost:4200)
npm run build          # Production build
npm test               # Run unit tests
npm run typecheck      # Check TypeScript types
npm run check          # Run typecheck + build
```

## Project Structure
```
src/app/
├── core/              # Services, guards, interceptors
├── features/          # Feature modules (dashboard, accounts, holdings)
├── shared/            # Reusable components
│   ├── components/    # UI components (header, widgets)
│   ├── styles/        # Global style overrides
│   └── ui/            # Spartan UI components
└── app.ts            # Root component
```

## Key Files
- `CLAUDE.md` - Comprehensive development guidelines
- `ANGULAR-BEST-PRACTICES.md` - Angular-specific patterns
- `src/app/shared/styles/README.md` - Styling documentation
- `src/styles.scss` - Global styles and overrides
- `tailwind.config.js` - Tailwind configuration

## Design System Quick Reference

### Colors
- Primary: `#6a3460` (purple)
- Primary Hover: `#c63663`
- Text: `#212b36` (dark), `#6e7787` (muted)
- Border: `#e5e7eb`
- Shadow: `0px 2px 6px 1px rgba(0, 0, 0, 0.03)`

### Typography
- Font: Red Hat Text (300-700 variable)
- Base: 14px
- Card Titles: 16px, 600 weight
- Small Text: 13px
- Button Text: 12px uppercase

### Component Patterns

#### Basic Card
```html
<div hlmCard class="bg-white rounded-lg shadow-sm p-0">
  <div hlmCardHeader class="px-6 py-5">
    <h3 hlmCardTitle>Title</h3>
  </div>
  <div hlmCardContent class="px-6 pb-6">
    <!-- Content -->
  </div>
</div>
```

#### Button
```html
<button hlmBtn>Primary</button>
<button hlmBtn variant="outline">Secondary</button>
<button hlmBtn variant="ghost">Ghost</button>
```

#### Tabs
```html
<hlm-tabs [tab]="activeTab">
  <hlm-tabs-list>
    <button hlmTabsTrigger="tab1">Tab 1</button>
    <button hlmTabsTrigger="tab2">Tab 2</button>
  </hlm-tabs-list>
  <div hlmTabsContent="tab1">Content 1</div>
  <div hlmTabsContent="tab2">Content 2</div>
</hlm-tabs>
```

## CSS Rules
1. **No !important** - Use specificity instead
2. **Tailwind first** - Before custom CSS
3. **Spartan components** - Before custom components
4. **Reusable patterns** - Avoid one-off solutions

## Angular Patterns
1. **Standalone components** - Always
2. **OnPush change detection** - Where possible
3. **Signals** - For state management
4. **New control flow** - @if, @for, @switch
5. **inject()** - Instead of constructor DI

## Git Workflow
1. Run `npm run typecheck` before commits
2. Run `npm run build` for final check
3. Never commit with !important in CSS
4. Use descriptive commit messages

## Common Tasks

### Add a new widget
1. Create component in `shared/components/`
2. Use Spartan Card directives
3. Follow existing widget patterns
4. Add to dashboard layout

### Override Spartan styling
1. Add to `styles.scss` or create override file
2. Use proper CSS specificity
3. Document the override
4. Avoid !important

### Create new route
1. Add to `app.routes.ts`
2. Use lazy loading for features
3. Create feature module in `features/`
4. Add navigation link if needed

## Debugging Tips
1. Check browser DevTools for CSS conflicts
2. Verify Tailwind classes are applied
3. Check Angular DevTools for change detection
4. Look for TypeScript errors in console
5. Verify imports for Spartan components

## Need Help?
- Spartan UI Docs: https://www.spartan.ng
- Angular Docs: https://angular.dev
- Tailwind Docs: https://tailwindcss.com
- Check existing components for patterns