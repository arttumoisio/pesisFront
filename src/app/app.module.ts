import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
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
import { DummyarrayPipe } from './pipes/dummyarray.pipe';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { PelaajaFormComponent } from './components/pelaaja-form/pelaaja-form.component';
import { JoukkueFormComponent } from './components/joukkue-form/joukkue-form.component';
import { VisualisointiComponent } from './components/visualisointi/visualisointi.component';
import { SuodinFormComponent } from './components/suodin-form/suodin-form.component';
import { DataService } from './services/dataservice.service';
import { ExtraFieldsComponent } from './components/forms/extra-fields/extra-fields.component';
import { SortPipe } from './pipes/sort.pipe';
import { SortService } from './services/sort.service';
import { FilterService } from './services/filter.service';
import { PaginatorService } from './services/paginator.service';
import { DotnetRESTservice } from './services/dotnetAPI.service';
import { KyselyApuService } from './services/kysely-apu.service';
import { PaginatorPipe } from './pipes/paginator.pipe';
import { TuomaritComponent } from './components/tuomarit/tuomarit.component';
import { TuomariFormComponent } from './components/tuomari-form/tuomari-form.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
import { TeamsExtraFormComponent } from './components/teams-extra-form/teams-extra-form.component';
import { TuomaritExtraFormComponent } from './components/tuomarit-extra-form/tuomarit-extra-form.component';

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
    DummyarrayPipe,
    FilterFormComponent,
    PelaajaFormComponent,
    JoukkueFormComponent,
    VisualisointiComponent,
    SuodinFormComponent,
    ExtraFieldsComponent,
    SortPipe,
    PaginatorPipe,
    TuomaritComponent,
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
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
