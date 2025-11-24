// directives/thousands-separator.directive.ts
import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appThousandsSeparator]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThousandsSeparatorDirective),
      multi: true
    }
  ],
  standalone: true
})
export class ThousandsSeparatorDirective implements ControlValueAccessor {
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value.replace(/,/g, '');
    this.onChange(value ? parseInt(value) : null);
    this.formatValue(value);
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
  }

  private formatValue(value: string) {
    if (!value) {
      this.el.nativeElement.value = '0';
      return;
    }

    const numberValue = parseInt(value);
    if (isNaN(numberValue)) {
      this.el.nativeElement.value = '0';
      return;
    }

    this.el.nativeElement.value = numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  writeValue(value: any): void {
    if (value !== null && value !== undefined) {
      this.formatValue(value.toString());
    } else {
      this.el.nativeElement.value = '0';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
