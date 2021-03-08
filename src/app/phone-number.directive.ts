/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Directive, forwardRef, ElementRef, HostListener } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  FormControl,
} from '@angular/forms';

const prefix = 'orxe';
@Directive({
  selector: `${prefix}-phone-number`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneNumberDirective),
      multi: true,
    },
  ],
})
export class PhoneNumberDirective implements ControlValueAccessor {
  private _value: any;

  onChange: any = () => {};
  onTouched: any = () => {};
  private _lastValue: any;

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(this._value);
    this.onTouched();
    this.elementRef.nativeElement.value = val;
  }
  handleChange(val) {
    if (val !== this._lastValue) {
      this._lastValue = val;
      this.onChange(this._lastValue);
      this.onTouched();
      this.elementRef.nativeElement.value = this._lastValue;
    }
  }

  validate({ value }: FormControl) {
    if (value?.phone) {
      if (value?.invalid) {
        return { invalid: 'true' };
      } else if (!value?.invalid) {
        return null;
      }
    }
  }

  @HostListener('onload', ['$event.detail.value'])
  listenForValueload(value) {
    this.value = value;
  }
  @HostListener('onChange', ['$event.detail.value'])
  listenForValueChange(value) {
    this.value = value;
  }
  constructor(private elementRef: ElementRef) {}
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
