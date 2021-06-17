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
    CartSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
