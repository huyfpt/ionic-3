import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
/*
  Generated class for the GeoLocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeoLocationProvider {

  constructor(public http: Http) {
    console.log('Hello GeoLocationProvider Provider');
  }

  getDevices(){
     return this.http.get('/getDivice')
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error){
  	console.error(error);
  	return Observable.throw(error.json().error || "Server error")
  }
}
