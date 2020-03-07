import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PelaajatComponent } from './components/pelaajat/pelaajat.component';
import { JoukkueetComponent } from './components/joukkueet/joukkueet.component';
import { MVPelaajatComponent } from './components/mvpelaajat/mvpelaajat.component';
import { MVJoukkueetComponent } from './components/mvjoukkueet/mvjoukkueet.component';


const routes: Routes = [
  {path: 'pelaajat', component: PelaajatComponent},
  {path: 'joukkueet', component: JoukkueetComponent},
  {path: 'mvpelaajat', component: MVPelaajatComponent},
  {path: 'mvjoukkueet', component: MVJoukkueetComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
