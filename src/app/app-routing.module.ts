import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PelaajatComponent } from './pelaajat/pelaajat.component';
import { JoukkueetComponent } from './joukkueet/joukkueet.component';
import { TilastoSelainComponent } from './tilasto-selain/tilasto-selain.component';
import { VertailuComponent } from './vertailu/vertailu.component';
import { TuomaritComponent } from './tuomarit/tuomarit.component';
import { LyhytSelainComponent } from './lyhyt-selain/lyhyt-selain.component';
import { KaikkiComponent } from './kaikki/kaikki.component';
import { MVPelaajatComponent } from './mvpelaajat/mvpelaajat.component';


const routes: Routes = [
  {path:'pelaajat', component: PelaajatComponent},
  {path:'joukkueet', component: JoukkueetComponent},
  {path:'tilastoselain', component: TilastoSelainComponent},
  {path:'vertailu', component: VertailuComponent},
  {path:'tuomarit', component: TuomaritComponent},
  {path:'lyhyt', component: LyhytSelainComponent},
  {path:'kaikki', component: KaikkiComponent},
  {path:'mvpelaajat', component: MVPelaajatComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
