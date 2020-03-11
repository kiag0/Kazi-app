import { AuthProvider } from './../auth/auth';
import { HttpClient, HttpInterceptor,  HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the AuthInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthInterceptorProvider implements HttpInterceptor {
 

  constructor(public http: HttpClient, private auth: AuthProvider, private storage : Storage) {


  }

  intercept(req:HttpRequest<any>, next: HttpHandler){
    const poken = this.auth.getPoken();
    
    console.log("this is tokeeen" + poken);
    const urequest = req.clone({ 
     headers: req.headers.set('Authorization', "Bearer "+ poken)
    })
    return next.handle(urequest);

  } 

}
