import {Component} from '@angular/core';
import {User} from './model/User';

import {SharedService} from './services/shared.service';
import {UserServiceService} from './services/user-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User = JSON.parse(localStorage.getItem('user'));
  logged = false;

  constructor(private shared: SharedService, private loginService: UserServiceService, private router: Router) {
    const userLogged = JSON.parse(localStorage.getItem('user'));
    if (userLogged != null) {
      const token: string [] = atob(localStorage.getItem('token')).split(':');
      const user = {username: token[0], password: token[1]};
      this.loginService.login(user).subscribe(data => {
        console.log('logged ' + data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', btoa(user.username + ':' + user.password));
        this.logged = true;
        this.router.navigate(['home']);
      }, () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.logged = false;
        this.router.navigate(['login']);
      });
    }
    localStorage.removeItem('game');
    shared.changeEmitted$.subscribe(text => {
      console.log(text);
      this.logged = true;
    });
  }

  logout() {
    console.log('logged out. ');
    localStorage.clear();
    this.logged = false;
    return this.router.navigate(['login']);
  }

}


