import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent {

  registerForm: FormGroup;

  submitAttempt: boolean = false;
  isCorrectPass: boolean = true;
  badNick: boolean = false;

  constructor(private _fb: FormBuilder) {
    this.registerForm = this._fb.group({
      names: ['', Validators.required],
      last_name: ['', Validators.required],
      nickname: ['', Validators.required],
      rut: ['', Validators.required],
      address: ['', Validators.required],
      region: ['', Validators.required],
      commune: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      conf_pass: ['', Validators.required]
    });
  }

  public isFieldInvalid(field: string) {
    const control = this.registerForm.get(field);
    if (!control) return false;

    return (!control.valid && control.touched) || (control.pristine && this.submitAttempt);
  }

  onSubmit(): void {
    this.submitAttempt = true;

    const data = this.registerForm.getRawValue();

    if (!this.validPasswords()) {
      this.isCorrectPass = false;
    } else {
      this.isCorrectPass = true;

      if (this.registerForm.valid) {
        console.log('register');
      }
    } 
    console.log(data);
  }

  private validPasswords() {
    const pass = this.registerForm.controls.password.value;
    const conf_pass = this.registerForm.controls.conf_pass.value;

    return (pass == conf_pass);
  }
}
