import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import '@nextgen-checkout-orxe-components/phone-number';
import '@nextgen-checkout-orxe-components/phone-number';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'phone-number-control';
  constructor(private fb: FormBuilder, private _cdr: ChangeDetectorRef) { }
  contactForm = this.fb.group(
    {
      phone: [],
    }
  );
  abc(event) {
    console.log(event);
  }
  onSubmit() {
    debugger;
    console.log("phone" + this.contactForm.value.phone);
  }
}
