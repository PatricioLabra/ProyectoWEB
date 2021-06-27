import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '@models/profile.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInfoService } from '@services/user-info.service';
import { ApiConnectionService } from '@services/api-connection.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  @Input()
  isAdmin: boolean = false;

  profileForm: FormGroup;
  submitAttempt: boolean;
  badNick: boolean;
  badPass: boolean;
  isOldUser: boolean;

  constructor(
    private _fb: FormBuilder,
    private api: ApiConnectionService,
    public userInfo: UserInfoService,
    private router: Router
  ) {
    this.profileForm = this._fb.group(
      {
        nickname: [null, Validators.required],
        password: [null, Validators.required],
        recordar: [false]
      }
    )

    this.submitAttempt = false;
    this.badNick = false;
    this.badPass = false;
    this.isOldUser = false;
  }

  ngOnInit(): void {
    if (this.userInfo.checkUserCookie()) {
      this.userInfo.loadUserCookie();
      this.isOldUser = true;
    }
  }

  public isFieldInvalid(field: string) {
    const control = this.profileForm.get(field);
    if (!control) return false;

    return (!control.valid && control.touched) || (control.pristine && this.submitAttempt);
  }
  
  public onSubmit(): void {
    this.submitAttempt = true;

    if (this.profileForm.valid) {
      const data: Profile = this.profileForm.getRawValue() as Profile;
      const profileData = {nickname: data.nickname, password: data.password};

      this.api.signIn(profileData, this.isAdmin).subscribe(this.successLogin, this.handleError);
    }
  }

  private successLogin = (data: any) => {
    this.badNick = false;
    this.badPass = false;

    const { token } = data as any;
    const nickname = this.profileForm.controls.nickname.value;

    this.userInfo.signInUser(nickname, token, this.isAdmin, this.profileForm.controls.recordar.value);
    this.router.navigate(['/']);
  }

  private handleError = (error: HttpErrorResponse) => {
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

  recordarUsuario() {

  }
}
