import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from '@components/app-component/app.component';
import { TestingComponent } from './components/testing/testing.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormLoginComponent } from './components/form-login/form-login.component';

@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
    HeaderComponent,
    FooterComponent,
    FormLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
