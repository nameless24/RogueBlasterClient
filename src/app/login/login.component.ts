import { Component, OnInit } from '@angular/core';
import {User} from '../model/User';
import {UserServiceService} from '../services/user-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();

  constructor(private loginService: UserServiceService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.user).subscribe(data => {
      console.log(data);
      localStorage.setItem('token', btoa(this.user.username + ':' + this.user.password));
      localStorage.setItem('user', JSON.stringify(data));
      this.router.navigate(['home']);

    }, err2 => {
      console.log(err2);
    });
  }

}





