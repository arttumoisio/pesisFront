import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PelaajatComponent } from './pelaajat/pelaajat.component';
import { NavigointiComponent } from './navigointi/navigointi.component';

@NgModule({
  declarations: [
    AppComponent,
    PelaajatComponent,
    NavigointiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
