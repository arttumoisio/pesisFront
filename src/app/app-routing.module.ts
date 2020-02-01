import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PelaajatComponent } from './pelaajat/pelaajat.component';
import { JoukkueetComponent } from './joukkueet/joukkueet.component';
import { TilastoSelainComponent } from './tilasto-selain/tilasto-selain.component';
import { VertailuComponent } from './vertailu/vertailu.component';
import { TuomaritComponent } from './tuomarit/tuomarit.component';


const routes: Routes = [
  {path:'pelaajat', component: PelaajatComponent},
  {path:'joukkueet', component: JoukkueetComponent},
  {path:'tilastoselain', component: TilastoSelainComponent},
  {path:'vertailu', component: VertailuComponent},
  {path:'tuomarit', component: TuomaritComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
