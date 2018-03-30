import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../services/user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user = {nome: '', cognome: '', username: '', email: '', password: ''};

  constructor(private userService: UserServiceService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    if (this.user.email && this.user.password && this.user.nome && this.user.username && this.user.cognome) {
      this.userService.register(this.user).subscribe(data => {
        console.log(data);
        this.router.navigate(['login']);
      }, err => {
        console.log(err);
      });
    }
  }

}
