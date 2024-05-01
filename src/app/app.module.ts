import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { withFetch } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InterfaceComponent } from './interface/interface.component';
import { JournalFormComponent } from './journal-form/journal-form.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InterfaceComponent,
    JournalFormComponent,
    EditEntryComponent,
    UpdatePasswordComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Add FormsModule here
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [
    // provideHttpClient(HttpClient).withFetch(),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
