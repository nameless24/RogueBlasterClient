import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import {UserServiceService} from './services/user-service.service';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from './services/auth-guard.service';
import {InterceptorService} from './services/interceptor.service';
import {SharedService} from './services/shared.service';
import { MapComponent } from './map/map.component';
import { PersonaggiComponent } from './personaggi/personaggi.component';
import { MappeComponent } from './mappe/mappe.component';
import { GameComponent } from './game/game.component';
import {CharacterService} from './services/character.service';
import {CharacterComponent} from './character/character.component';
import {GameService} from './services/game.service';
import { LoadingComponent } from './loading/loading.component';
import { LoadingModule } from 'ngx-loading';
import { GameoverComponent } from './gameover/gameover.component';
import { WinComponent } from './win/win.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MapComponent,
    PersonaggiComponent,
    MappeComponent,
    GameComponent,
    CharacterComponent,
    LoadingComponent,
    GameoverComponent,
    WinComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LoadingModule,
  ],
  providers: [UserServiceService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    SharedService,
    CharacterService,
    GameService,
    LoadingComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
