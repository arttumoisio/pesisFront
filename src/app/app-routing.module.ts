import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PelaajatComponent } from './components/vanhat/pelaajat/pelaajat.component';
import { JoukkueetComponent } from './components/vanhat/joukkueet/joukkueet.component';
import { MVPelaajatComponent } from './components/views/mvpelaajat/mvpelaajat.component';
import { MVJoukkueetComponent } from './components/views/mvjoukkueet/mvjoukkueet.component';
import { TuomaritComponent } from './components/views/tuomarit/tuomarit.component';


const routes: Routes = [
  { path: '',   redirectTo: '/joukkueet', pathMatch: 'full' },
  {path: 'mvpelaajat', component: PelaajatComponent},
  {path: 'mvjoukkueet', component: JoukkueetComponent},
  {path: 'pelaajat', component: MVPelaajatComponent},
  {path: 'joukkueet', component: MVJoukkueetComponent},
  {path: 'tuomarit', component: TuomaritComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
