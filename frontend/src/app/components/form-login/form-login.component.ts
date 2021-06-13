import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent {

  profileForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.profileForm = this._fb.group(
      {
        nickname: [null, Validators.required],
        password: [null, Validators.required]
      }
    )
  }

  public showError(controlName: string): boolean {
    const control = this.profileForm.controls.nickname;
    console.log(control);
    return control.invalid && control.dirty;
  }

  public isFieldValid(field: string): boolean {
    const control = this.profileForm.get(field);
    return (!control?.valid && control?.touched) || false;
  }
  
  public onSubmit(): void {
    console.log(this.profileForm.get('nickname')?.valid);
  }
}
