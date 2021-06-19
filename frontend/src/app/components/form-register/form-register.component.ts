import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Region, Regiones } from '@models/communes.model';
import { ApiConnectionService } from '@services/api-connection.service';
import { UserInfoService } from '@services/user-info.service';

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
  Regions: Array<Region> = Regiones;
  CurrentRegion: Region;

  constructor(
    private _fb: FormBuilder,
    private api: ApiConnectionService,
    private userInfo: UserInfoService,
    private router: Router
  ) {
    this.registerForm = this._fb.group({
      names: ['', Validators.required],
      last_name: ['', Validators.required],
      nickname: ['', Validators.required],
      rut: ['', Validators.required],
      address: ['', Validators.required],
      region: ['Arica y Parinacota', Validators.required],
      commune: ['Arica', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      conf_pass: ['', Validators.required]
    });

    this.CurrentRegion = this.Regions[0];
  }

  public isFieldInvalid(field: string) {
    const control = this.registerForm.get(field);
    if (!control) return false;

    return (!control.valid && control.touched) || (control.pristine && this.submitAttempt);
  }

  onSubmit(): void {
    this.submitAttempt = true;

    const data = this.registerForm.getRawValue();
    console.log(data);

    if (!this.validPasswords()) {
      this.isCorrectPass = false;
    } else {
      this.isCorrectPass = true;

        console.log(this.registerForm.controls.email.errors);
      if (this.registerForm.valid) {
        this.api.signUp(data, false).subscribe((data: any) => {
          const token = data.token;
          const nickname = this.registerForm.controls.nickname.value;

          this.userInfo.signInUser(nickname, token, false);
          this.router.navigate(['home']);
        });
      }
    } 
  }

  updateCurrentRegion() {
    const regionName = this.registerForm.controls.region.value;
    const index = this.Regions.findIndex((region: Region) => region.region == regionName);

    if (index != -1)
      this.CurrentRegion = this.Regions[index];

    console.log(this.CurrentRegion);
  }

  private validPasswords() {
    const pass = this.registerForm.controls.password.value;
    const conf_pass = this.registerForm.controls.conf_pass.value;

    return (pass == conf_pass);
  }
}
