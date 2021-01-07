/* eslint-disable @typescript-eslint/no-use-before-define */
import { Directive, forwardRef, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const prefix = 'orxe';

@Directive({
  selector: `orxe-phone-number`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberDirective),
      multi: true,
    },
  ],
})
export class PhoneNumberDirective implements ControlValueAccessor {
  private _value: any;
  private _lastValue: any;
  onChange: any = () => { };
  onTouched: any = () => { };
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(this._value);
    this.onTouched();
    this.elementRef.nativeElement.value = val;
  }
  @HostListener('onload', ['$event.detail.value'])
  listenForValueload(value) {
    this.value = value;
  }
  constructor(private elementRef: ElementRef) {
  }
  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}