import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PelaajatComponent } from './pelaajat/pelaajat.component';
import { JoukkueetComponent } from './joukkueet/joukkueet.component';


const routes: Routes = [
  {path:'pelaajat', component: PelaajatComponent},
  {path:'joukkueet', component: JoukkueetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
