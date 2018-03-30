import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MapComponent} from './map/map.component';
import {PersonaggiComponent} from './personaggi/personaggi.component';
import {MappeComponent} from './mappe/mappe.component';
import {GameComponent} from './game/game.component';
import {CharacterComponent} from './character/character.component';
import {LoadingComponent} from './loading/loading.component';
import {GameoverComponent} from './gameover/gameover.component';
import {WinComponent} from './win/win.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'map', component: MapComponent},
  {path: 'personaggi', component: PersonaggiComponent},
  {path: 'mappe', component: MappeComponent},
  {path: 'game', component: GameComponent},
  {path: 'character', component: CharacterComponent},
  {path: 'loading', component: LoadingComponent},
  {path: 'gameover', component: GameoverComponent},
  {path: 'win', component: WinComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
