# Styling Guidelines & Architecture

## CSS Architecture Overview

### 1. Style Hierarchy (from highest to lowest priority)
1. **Inline Tailwind classes** - Preferred for component-specific styling
2. **Component styles** - Only when Tailwind isn't sufficient
3. **Global overrides** - For Spartan UI component customization
4. **Base styles** - In styles.scss for app-wide defaults

### 2. When to Use Each Approach

#### Use Tailwind Classes When:
- Setting spacing, colors, typography
- Creating responsive layouts
- Adding hover/focus states
- Building standard UI patterns

```html
<!-- Good -->
<div hlmCard class="bg-white rounded-lg shadow-sm p-0">
  <div hlmCardHeader class="flex items-center justify-between px-6 py-5">
```

#### Use Global Overrides When:
- Customizing Spartan UI default behavior
- Implementing design system requirements
- Styling third-party components
- Creating reusable component variants

```scss
// In styles.scss or dedicated override file
[hlmCardTitle] {
  font-size: 16px;
  font-weight: 600;
  font-family: 'Red Hat Text', sans-serif;
}
```

#### Use Component Styles When:
- Complex animations
- Dynamic styles based on component state
- Styles that can't be expressed with utilities

### 3. File Organization

```
src/app/shared/styles/
├── README.md           # This file
├── tabs-overrides.scss # Tab component overrides
├── _variables.scss     # Sass variables (if needed)
└── _mixins.scss       # Reusable mixins (if needed)
```

### 4. Important Rules

#### NEVER Use !important Unless:
1. Overriding third-party library styles that use !important
2. Documented with clear explanation
3. No other solution exists

#### Alternative to !important:
```scss
// Bad
.my-class {
  color: red !important;
}

// Good - Use specificity
hlm-tabs .my-class {
  color: red;
}

// Better - Use Tailwind
<div class="text-red-500">
```

### 5. Design Tokens

#### Colors
- Primary: #6a3460
- Primary Hover: #c63663
- Primary Active: #5a2c50
- Text Primary: #212b36
- Text Secondary: #6e7787
- Border: #e5e7eb
- Background: #f8f9fa

#### Typography Scale
- Base: 14px (1rem)
- Small: 13px
- Extra Small: 12px
- Large: 16px
- H3: 20px (1.25rem)

#### Spacing Scale (8px grid)
- xs: 4px (0.25rem)
- sm: 8px (0.5rem)
- md: 16px (1rem)
- lg: 24px (1.5rem)
- xl: 32px (2rem)
- 2xl: 40px (2.5rem)

### 6. Common Patterns

#### Card with Header
```html
<div hlmCard class="bg-white rounded-lg shadow-sm p-0">
  <div hlmCardHeader class="flex items-center justify-between px-6 py-5 min-h-[64px]">
    <h3 hlmCardTitle>Title</h3>
    <button hlmBtn size="sm">Action</button>
  </div>
  <div hlmCardContent class="px-6 pb-6">
    <!-- Content -->
  </div>
</div>
```

#### Custom Tab Styling
```scss
// Override in global styles
hlm-tabs-list {
  @apply h-auto p-0 bg-transparent rounded-none w-full;
  border: none;
  box-shadow: none;
}

[hlmTabsTrigger] {
  @apply bg-transparent border-0 rounded-none;
  padding: 20px;
  // ... other styles
}
```

### 7. Responsive Design

Always use Tailwind's responsive prefixes:
```html
<!-- Mobile first approach -->
<div class="px-4 md:px-6 lg:px-8">
  <h1 class="text-2xl md:text-3xl lg:text-4xl">
</div>
```

### 8. Performance Tips

1. **Avoid deep nesting** in SCSS
2. **Use CSS custom properties** for dynamic values
3. **Minimize specificity** - prefer single class selectors
4. **Group related utilities** in Tailwind

### 9. Debugging CSS Issues

1. Check browser DevTools for applied styles
2. Look for specificity conflicts
3. Verify Tailwind classes are being applied
4. Check for CSS order issues in imports
5. Use CSS cascade layers if needed

### 10. Future Considerations

- Consider CSS Modules or ViewEncapsulation for truly isolated styles
- Evaluate CSS-in-JS solutions if complexity grows
- Document any custom utility classes created
- Keep tracking Tailwind updates for new utilities