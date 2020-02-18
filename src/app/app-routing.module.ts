import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PelaajatComponent } from './components/pelaajat/pelaajat.component';
import { JoukkueetComponent } from './components/joukkueet/joukkueet.component';
import { TilastoSelainComponent } from './components/tilasto-selain/tilasto-selain.component';
import { VertailuComponent } from './components/vertailu/vertailu.component';
import { TuomaritComponent } from './components/tuomarit/tuomarit.component';
import { LyhytSelainComponent } from './components/lyhyt-selain/lyhyt-selain.component';
import { KaikkiComponent } from './components/kaikki/kaikki.component';
import { MVPelaajatComponent } from './components/mvpelaajat/mvpelaajat.component';
import { MVJoukkueetComponent } from './components/mvjoukkueet/mvjoukkueet.component';


const routes: Routes = [
  {path: 'pelaajat', component: PelaajatComponent},
  {path: 'joukkueet', component: JoukkueetComponent},
  {path: 'tilastoselain', component: TilastoSelainComponent},
  {path: 'vertailu', component: VertailuComponent},
  {path: 'tuomarit', component: TuomaritComponent},
  {path: 'lyhyt', component: LyhytSelainComponent},
  {path: 'kaikki', component: KaikkiComponent},
  {path: 'mvpelaajat', component: MVPelaajatComponent},
  {path: 'mvjoukkueet', component: MVJoukkueetComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
