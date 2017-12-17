import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let apiUrl = 'user';
/*
  Generated class for the SecurityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SecurityProvider {

  constructor(public http: Http) {
    console.log('Hello SecurityProvider Provider');
  }
getData(){
    return new Promise((resolve, reject) =>{
      // let headers = new Headers();
      this.http.get(apiUrl).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }
 signup(infoUser: Object) {
    return new Promise((resolve, reject) =>{
      this.http.post('/signup', infoUser).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });
    });    
  }
  login(infoUser: Object) {
    return new Promise((resolve, reject) =>{
      this.http.post('/login', infoUser).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });
    });    
  }
}