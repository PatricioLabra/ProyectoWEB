import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '@components/admin-login/admin-login.component';
import { CartSectionComponent } from '@components/cart-section/cart-section.component';

import { FormLoginComponent } from '@components/form-login/form-login.component';
import { HomeComponent } from '@components/home/home.component';
import { ProductSectionComponent } from '@components/product-section/product-section.component';
import { SearchedProductsSectionComponent } from '@components/searched-products-section/searched-products-section.component';
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
    path: 'admin/login', component: AdminLoginComponent
  },
  {
    path: 'cart', component: CartSectionComponent
  },
  {
    path: 'product/:id', component: ProductSectionComponent
  },
  {
    path: 'search', component: SearchedProductsSectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
