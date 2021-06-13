import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent {

  profileForm: FormGroup;
  submitAttempt: boolean;

  constructor(private _fb: FormBuilder) {
    this.profileForm = this._fb.group(
      {
        nickname: [null, Validators.required],
        password: [null, Validators.required]
      }
    )

    this.submitAttempt = false;
  }

  public isFieldInvalid(field: string) {
    const control = this.profileForm.get(field);
    if (!control) return false;

    return (!control.valid && control.touched) || (control.untouched && this.submitAttempt);
  }
  
  public onSubmit(): void {
    this.submitAttempt = true;

    if (this.profileForm.valid) {
      console.log(this.profileForm.getRawValue());
    }
  }
}
