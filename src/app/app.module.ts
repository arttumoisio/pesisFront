import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigointiComponent } from './components/navigointi/navigointi.component';
import { PelaajatComponent } from './components/views/pelaajat/pelaajat.component';
import { JoukkueetComponent } from './components/views/joukkueet/joukkueet.component';
import { TuomaritComponent } from './components/views/tuomarit/tuomarit.component';

import { DataPaikkaComponent } from './components/visualisointi/data-paikka/data-paikka.component';
import { SpinnerComponent } from './components/visualisointi/spinner/spinner.component';
import { PaginatorComponent } from './components/visualisointi/paginator/paginator.component';
import { VisualisointiComponent } from './components/visualisointi/visualisointi.component';

import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { PaginatorPipe } from './pipes/paginator.pipe';

import { ExtraFieldsComponent } from './components/forms/extra-fields/extra-fields.component';
import { FilterFormComponent } from './components/forms/filter-form/filter-form.component';
import { PelaajaFormComponent } from './components/forms/pelaaja-form/pelaaja-form.component';
import { JoukkueFormComponent } from './components/forms/joukkue-form/joukkue-form.component';
import { SuodinFormComponent } from './components/forms/suodin-form/suodin-form.component';
import { TuomariFormComponent } from './components/forms/tuomari-form/tuomari-form.component';
import { BasicFormComponent } from './components/forms/basic-form/basic-form.component';
import { TeamsExtraFormComponent } from './components/forms/teams-extra-form/teams-extra-form.component';
import { TuomaritExtraFormComponent } from './components/forms/tuomarit-extra-form/tuomarit-extra-form.component';
import { appReducers } from './store/reducers/app.reducers';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    SortPipe,
    PaginatorPipe,

    NavigointiComponent,
    PelaajatComponent,
    JoukkueetComponent,
    TuomaritComponent,
    VisualisointiComponent,
    DataPaikkaComponent,
    PaginatorComponent,
    SpinnerComponent,
    PelaajaFormComponent,
    JoukkueFormComponent,
    FilterFormComponent,
    SuodinFormComponent,
    ExtraFieldsComponent,
    TuomariFormComponent,
    BasicFormComponent,
    TeamsExtraFormComponent,
    TuomaritExtraFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
