import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroeComponent } from './paginas/heroe/heroe.component';
import {HeroesComponent} from './paginas/heroes/heroes.component';

const routes: Routes = [
  {path: 'heroe/:id' , component: HeroeComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: '**' , pathMatch: 'full' , redirectTo: 'heroes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
