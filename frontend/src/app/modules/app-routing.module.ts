import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormLoginComponent } from '@components/form-login/form-login.component';
import { HomeComponent } from '@components/home/home.component';
import { ProductSectionComponent } from '@components/product-section/product-section.component';
import { TestingComponent } from '@components/testing/testing.component';

const routes: Routes = [
  {
    path: '', component: TestingComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: FormLoginComponent
  },
  {
    path: 'product/:id', component: ProductSectionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
