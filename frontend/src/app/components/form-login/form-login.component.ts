import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Profile } from '@models/profile.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInfoService } from '@services/user-info.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent {

  @Input()
  isAdmin: boolean = false;

  profileForm: FormGroup;
  submitAttempt: boolean;
  badNick: boolean;
  badPass: boolean;

  constructor(
    private _fb: FormBuilder,
    private auth: AuthService,
    private userInfo: UserInfoService,
    private router: Router
  ) {
    this.profileForm = this._fb.group(
      {
        nickname: [null, Validators.required],
        password: [null, Validators.required]
      }
    )

    this.submitAttempt = false;
    this.badNick = false;
    this.badPass = false;
  }

  public isFieldInvalid(field: string) {
    const control = this.profileForm.get(field);
    if (!control) return false;

    return (!control.valid && control.touched) || (control.untouched && this.submitAttempt);
  }
  
  public onSubmit(): void {
    this.submitAttempt = true;

    if (this.profileForm.valid) {
      const profileData: Profile = this.profileForm.getRawValue() as Profile;

      this.auth.signUp(profileData).subscribe(
        (data: any) => {
          this.badNick = false;
          this.badPass = false;

          const { token } = data as any;
          const nickname = this.profileForm.controls.nickname.value;

          this.userInfo.signInUser(nickname, token, this.isAdmin);
          this.router.navigate(['/']);
        }, 
        (error: HttpErrorResponse) => {
          switch (error.status) {
            case 404: 
              this.badNick = true;
              this.badPass = false;
              break;
            case 400:
              this.badNick = false;
              this.badPass = true;
              break;
            default : console.log(error);
          }
        }
      );
    }
  }
}
