import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PelaajatComponent } from './components/views/pelaajat/pelaajat.component';
import { JoukkueetComponent } from './components/views/joukkueet/joukkueet.component';
import { TuomaritComponent } from './components/views/tuomarit/tuomarit.component';

const routes: Routes = [
  { path: '',   redirectTo: '/joukkueet', pathMatch: 'full' },
  {path: 'pelaajat', component: PelaajatComponent},
  {path: 'joukkueet', component: JoukkueetComponent},
  {path: 'tuomarit', component: TuomaritComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
