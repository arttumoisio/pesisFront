import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PelaajatComponent } from './components/pelaajat/pelaajat.component';
import { NavigointiComponent } from './components/navigointi/navigointi.component';
import { JoukkueetComponent } from './components/joukkueet/joukkueet.component';
import { DataPaikkaComponent } from './components/data-paikka/data-paikka.component';
import { TilastoSelainComponent } from './components/tilasto-selain/tilasto-selain.component';
import { VertailuComponent } from './components/vertailu/vertailu.component';
import { TuomaritComponent } from './components/tuomarit/tuomarit.component';
import { LyhytSelainComponent } from './components/lyhyt-selain/lyhyt-selain.component';
import { KaikkiComponent } from './components/kaikki/kaikki.component';
import { MVPelaajatComponent } from './components/mvpelaajat/mvpelaajat.component';
import { MVJoukkueetComponent } from './components/mvjoukkueet/mvjoukkueet.component';
import { StickyTableHeaderDirective } from './directives/sticky-table-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    PelaajatComponent,
    NavigointiComponent,
    JoukkueetComponent,
    DataPaikkaComponent,
    TilastoSelainComponent,
    VertailuComponent,
    TuomaritComponent,
    LyhytSelainComponent,
    KaikkiComponent,
    MVPelaajatComponent,
    MVJoukkueetComponent,
    StickyTableHeaderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
