import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BACKEND_URL} from '../util';
import {Router} from '@angular/router';

@Injectable()
export class GameService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getSmallMapData() {
    localStorage.removeItem('game');
    this.http.get(BACKEND_URL + '/game/getgame?sz=1').toPromise().then(res => {
      localStorage.setItem('game', JSON.stringify(res));
      return this.router.navigate(['character']);
    });
  }

  getMediumMapData() {
    localStorage.removeItem('game');
    this.http.get(BACKEND_URL + '/game/getgame?sz=2').toPromise().then(res => {
      localStorage.setItem('game', JSON.stringify(res));
      return this.router.navigate(['character']);
    });

  }

  getBigMapData() {
    localStorage.removeItem('game');
    this.http.get(BACKEND_URL + '/game/getgame?sz=3').toPromise().then(res => {
      localStorage.setItem('game', JSON.stringify(res));
      return this.router.navigate(['character']);
    });

  }

}
