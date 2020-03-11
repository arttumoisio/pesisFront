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
import { MVPelaajatComponent } from './components/mvpelaajat/mvpelaajat.component';
import { MVJoukkueetComponent } from './components/mvjoukkueet/mvjoukkueet.component';
import { SpinnerComponent } from './components/small/spinner/spinner.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterNoColumnPipe } from './pipes/filter-no-column.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PelaajatComponent,
    NavigointiComponent,
    JoukkueetComponent,
    DataPaikkaComponent,
    MVPelaajatComponent,
    MVJoukkueetComponent,
    SpinnerComponent,
    PaginatorComponent,
    FilterPipe,
    FilterNoColumnPipe
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
