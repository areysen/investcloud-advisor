import { BooleanInput } from '@angular/cdk/coercion';
import {
	ChangeDetectionStrategy,
	Component,
	booleanAttribute,
	computed,
	forwardRef,
	input,
	model,
	output,
	signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrnCheckboxComponent } from '@spartan-ng/brain/checkbox';
import { hlm } from '@spartan-ng/brain/core';
import type { ChangeFn, TouchFn } from '@spartan-ng/brain/forms';
import type { ClassValue } from 'clsx';

export const HLM_CHECKBOX_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => HlmCheckboxComponent),
	multi: true,
};

@Component({
	selector: 'hlm-checkbox',
	imports: [BrnCheckboxComponent],
	template: `
		<div [class]="_wrapperClass()" (click)="_handleChange()">
			<brn-checkbox
				[id]="id()"
				[name]="name()"
				[class]="'sr-only'"
				[checked]="checked()"
				[disabled]="state().disabled()"
				[required]="required()"
				[aria-label]="ariaLabel()"
				[aria-labelledby]="ariaLabelledby()"
				[aria-describedby]="ariaDescribedby()"
				(touched)="_onTouched?.()"
			>
			</brn-checkbox>
			<div [class]="_computedClass()">
				@if (checked() === true) {
					<svg class="checkbox-icon" viewBox="0 0 12 9" fill="none">
						<path d="M1 4.5L4.5 8L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				} @else if (checked() === 'indeterminate') {
					<div class="checkbox-minus"></div>
				}
			</div>
		</div>
	`,
	host: {
		class: 'contents peer',
		'[attr.id]': 'null',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
		'[attr.data-disabled]': 'state().disabled() ? "" : null',
	},
	providers: [HLM_CHECKBOX_VALUE_ACCESSOR],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrl: './hlm-checkbox.scss'
})
export class HlmCheckboxComponent implements ControlValueAccessor {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly error = input<boolean>(false);

	protected readonly _wrapperClass = computed(() =>
		hlm(
			'hlm-checkbox',
			this.checked() === true ? 'checked' : '',
			this.checked() === 'indeterminate' ? 'indeterminate' : '',
			this.state().disabled() ? 'disabled' : '',
			this.error() ? 'error' : '',
		),
	);

	protected readonly _computedClass = computed(() =>
		hlm(
			'checkbox-box',
			this.userClass(),
		),
	);

	/** Used to set the id on the underlying brn element. */
	public readonly id = input<string | null>(null);

	/** Used to set the aria-label attribute on the underlying brn element. */
	public readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });

	/** Used to set the aria-labelledby attribute on the underlying brn element. */
	public readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });

	/** Used to set the aria-describedby attribute on the underlying brn element. */
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });

	/** The checked state of the checkbox. */
	public readonly checked = model<CheckboxValue>(false);

	/** The name attribute of the checkbox. */
	public readonly name = input<string | null>(null);

	/** Whether the checkbox is required. */
	public readonly required = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	/** Whether the checkbox is disabled. */
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected readonly state = computed(() => ({
		disabled: signal(this.disabled()),
	}));

	public readonly changed = output<boolean>();

	protected _onChange?: ChangeFn<CheckboxValue>;
	protected _onTouched?: TouchFn;

	protected _handleChange(): void {
		if (this.state().disabled()) return;

		const previousChecked = this.checked();
		this.checked.set(previousChecked === 'indeterminate' ? true : !previousChecked);
		this._onChange?.(!previousChecked);
		this.changed.emit(!previousChecked);
	}

	/** CONTROL VALUE ACCESSOR */
	writeValue(value: CheckboxValue): void {
		this.checked.set(!!value);
	}

	registerOnChange(fn: ChangeFn<CheckboxValue>): void {
		this._onChange = fn;
	}

	registerOnTouched(fn: TouchFn): void {
		this._onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.state().disabled.set(isDisabled);
	}
}

type CheckboxValue = boolean | 'indeterminate';
