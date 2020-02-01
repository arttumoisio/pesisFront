import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PelaajatComponent } from './pelaajat/pelaajat.component';


const routes: Routes = [
  {path:'pelaajat', component: PelaajatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
