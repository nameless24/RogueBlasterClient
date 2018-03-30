import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BACKEND_URL} from '../util';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserServiceService {

  constructor(private http: HttpClient) {
  }

  login(user) {
    return this.http.post(BACKEND_URL + '/login', user, httpOptions);
  }

  register(user) {
    return this.http.post(BACKEND_URL + '/register', user, httpOptions);
  }
}
