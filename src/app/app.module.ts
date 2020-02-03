import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PelaajatComponent } from './pelaajat/pelaajat.component';
import { NavigointiComponent } from './navigointi/navigointi.component';
import { JoukkueetComponent } from './joukkueet/joukkueet.component';
import { DataPaikkaComponent } from './data-paikka/data-paikka.component';
import { TilastoSelainComponent } from './tilasto-selain/tilasto-selain.component';
import { VertailuComponent } from './vertailu/vertailu.component';
import { TuomaritComponent } from './tuomarit/tuomarit.component';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PelaajatComponent,
    NavigointiComponent,
    JoukkueetComponent,
    DataPaikkaComponent,
    TilastoSelainComponent,
    VertailuComponent,
    TuomaritComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
