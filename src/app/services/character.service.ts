import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BACKEND_URL} from '../util';

@Injectable()
export class CharacterService {

  constructor(private http: HttpClient) {
  }

  getCharacterData(){
    this.http.get(BACKEND_URL + '/game/getcharacter').toPromise().then(res => {
      localStorage.setItem('char', JSON.stringify(res));
      console.log(localStorage.getItem('char'));
    });
  }

}
