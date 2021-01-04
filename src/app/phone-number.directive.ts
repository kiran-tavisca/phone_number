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
  // handleChange(val) {
  //   if (val !== this._lastValue) {
  //     this._lastValue = val;
  //     this.onChange(this._lastValue);
  //     this.onTouched();
  //     this.elementRef.nativeElement.value = this._lastValue;
  //   }
  // }
  get value() {
    console.log("get value:" + this._value);
    debugger;
    return this._value;
  }

  set value(val) {
    debugger;
    this._value = val;
    this.onChange(this._value);
    this.onTouched();
    this.elementRef.nativeElement.value = val;
    console.log("element value" + JSON.stringify(this.elementRef.nativeElement.value));
  }

  constructor(private elementRef: ElementRef) {
    console.log("run directive");
  }

  @HostListener('onChange', ['$event.detail.value'])
  listenForValueChange(value) {
    console.log("onchange" + JSON.stringify(value));
    this.value = value;
  }
  @HostListener('onFocus', ['$event.detail.value'])
  listenForValueFocusChange(value) {
    console.log("onFoucs" + JSON.stringify(value));
    this.value = value;
  }
  @HostListener('onBlur', ['$event.detail.value'])
  listenForValueBlurChange(value) {
    console.log("onBlur" + JSON.stringify(value));
    this.value = value;
  }
  writeValue(value: any): void {
    if (value) {
      console.log("write value:" + value);
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