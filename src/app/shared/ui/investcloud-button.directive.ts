import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import type { ClassValue } from 'clsx';

// Extend the HlmButtonDirective to add custom InvestCloud button styles
@Directive({
  selector: '[icBtn]',
  standalone: true,
  hostDirectives: [
    {
      directive: HlmButtonDirective,
      inputs: ['size', 'variant']
    }
  ],
  host: {
    '[class]': '_computedClass()',
  },
})
export class InvestCloudButtonDirective {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  public readonly size = input<'compact' | 'convenient'>('compact');
  public readonly variant = input<'primary' | 'secondary' | 'ghost'>('primary');

  protected readonly _computedClass = computed(() => {
    const baseClasses = 'uppercase tracking-wide font-medium text-[13px] transition-all';
    
    const sizeClasses = {
      compact: 'px-[18px] py-[7.5px]',
      convenient: 'px-6 py-3'
    };

    const variantClasses = {
      primary: 'bg-primary text-white hover:bg-primary-dark border-0',
      secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white',
      ghost: 'bg-transparent text-neutral-700 hover:text-primary border-0'
    };

    return hlm(
      baseClasses,
      sizeClasses[this.size()],
      variantClasses[this.variant()],
      this.userClass()
    );
  });
}