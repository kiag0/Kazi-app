import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';
import {tap,map, filter} from 'rxjs/operators';
/*
  Generated class for the CarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CarsProvider Provider');
  }
}
/*
  getCars(lat,lng){
    return Observable
    .interval(2000)
    .switchMap(()=>{
      
    })
    .share(); 
  }

}

*/