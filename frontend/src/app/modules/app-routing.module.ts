import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormLoginComponent } from '@components/form-login/form-login.component';
import { TestingComponent } from '@components/testing/testing.component';

const routes: Routes = [
  {
    path: '', component: TestingComponent
  },
  {
    path: 'login', component: FormLoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
