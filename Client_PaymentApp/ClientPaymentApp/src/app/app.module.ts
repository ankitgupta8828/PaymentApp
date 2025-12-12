import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { PaymentDetailsFormComponent } from './payment-details/payment-details-form/payment-details-form.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationComponent } from './core/user-registration/user-registration/user-registration-form.component';
import { UserLoginFormComponent } from './core/user-login/user-login-form/user-login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentDetailsComponent,
    PaymentDetailsFormComponent,
    UserRegistrationComponent,
    UserLoginFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // The reason to add the HTTPClientModel in here is that it provides the complete HTTP Module dependency through out the entire application
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
