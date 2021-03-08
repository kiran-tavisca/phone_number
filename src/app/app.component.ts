import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// import '@nextgen-checkout-orxe-components/phone-number';
import '@checkout-orxe-components/phone-number';
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'phone-number-control';

  constructor(private fb: FormBuilder, private _cdr: ChangeDetectorRef) {}
  contactForm = this.fb.group({
    phone: [],
  });

  abc(event) {
    // console.log(event);
  }
  onSubmit() {
    debugger;
    console.log('phone' + this.contactForm.value.phone);
    AppComponent.validateAllFormFields(this.contactForm);
  }
  static validateAllFormFields(formGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      console.log(field, 'fieldddddd');
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        console.log('nnn');
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
