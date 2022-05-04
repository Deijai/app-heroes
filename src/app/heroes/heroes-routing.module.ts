import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: 'edit/:id',
        component: AddComponent,
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'heroe/:id',
        component: HeroeComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild( routes ),
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
