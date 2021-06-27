import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './modules/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from '@components/app-component/app.component';
import { TestingComponent } from './components/testing/testing.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { FieldErrorComponent } from './components/field-error/field-error.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartHeaderComponent } from './components/cart-header/cart-header.component';
import { ProductSectionComponent } from './components/product-section/product-section.component';
import { CategoryCatalogComponent } from './components/category-catalog/category-catalog.component';
import { HomeComponent } from './components/home/home.component';
import { CartSectionComponent } from './components/cart-section/cart-section.component';
import { SearchedProductsSectionComponent } from './components/searched-products-section/searched-products-section.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormFilterComponent } from './components/form-filter/form-filter.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { ReportUsersComponent } from './components/report-users/report-users.component';
import { ReportProductsComponent } from './components/report-products/report-products.component';
import { CartBoughtCardComponent } from './components/cart-bought-card/cart-bought-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '@modules/angular-material/angular-material.module';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormCommentComponent } from './components/form-comment/form-comment.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    HeaderComponent,
    FooterComponent,
    FormLoginComponent,
    FieldErrorComponent,
    ProductCardComponent,
    CartHeaderComponent,
    ProductSectionComponent,
    CategoryCatalogComponent,
    HomeComponent,
    CartSectionComponent,
    SearchedProductsSectionComponent,
    SearchBarComponent,
    FormFilterComponent,
    AdminLoginComponent,
    FormRegisterComponent,
    ReportUsersComponent,
    ReportProductsComponent,
    CartBoughtCardComponent,
    PanelAdminComponent,
    FormCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgbModule,
    RecaptchaFormsModule,
    RecaptchaModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
