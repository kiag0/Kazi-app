import { AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import { User } from '../../models/user.model';
import { stringify } from '@angular/core/src/util';

//import { HTTP } from '@ionic-native/http';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public token : string;
  public poken : string;
  private registerListener = new Subject<boolean>();
  private authStatusListener = new Subject<boolean>();

  constructor(public http: HttpClient, public alertCtrl: AlertController, private storage: Storage ) {
    console.log('Hello AuthProvider Provider');
  }



  //-----------------user registration---------------------------
  localRegister(form:NgForm){
    const userData : User = {
      phone: form.value.phone, 
      password:form.value.password};
    let url = "http://127.0.0.1:4000/api/user/signup";

    this.http.post<{message: string, result:{phone: string}}>(url, userData )
    .subscribe( data=>{
      this.registerListener.next(true);
       console.log(data); 
       this.showAlert(data.message, `Login using ${data.result.phone}`);
       
      
    }, err=>{
      console.dir("error making call : " + err);
      this.showAlert('An Error Occurred!', "Account might already exist. Check internet connection and try again!");
    });

  }
//--------------------------------------------------------------- 


//--------------new http(ionic-cordova)--------------------------

// localRegister(form:NgForm){
  
//   const userData : User = {
//     phone: form.value.phone, 
//     password:form.value.password};
//   let url = "http://167.172.104.139:3000/api/user/signup";
//   return new Promise((resolve, reject) => {
//     //Don't check SSL Certificate
//     this.httpLocal.setSSLCertMode('nocheck');
//     this.httpLocal.setHeader('*', 'Access-Control-Allow-Origin' , '*');
//     this.httpLocal.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
//     this.httpLocal.setHeader('*', 'Accept','application/json');
//     this.httpLocal.setHeader('*', 'content-type','application/json');
//     //Important to set the data serializer or the request gets rejected
//     this.httpLocal.setDataSerializer('json');
//     this.httpLocal.post(url, userData, {}).then(res =>{
//       resolve(JSON.parse(res.data));
//       this.registerListener.next(true);
//       console.log(res.data);
//     })
//     .catch(err =>{
//       console.dir("error making call : " + err);
//       reject(err);
//     });
//   });

// }
//---------------------------------------------------------------


//------------------user login-----------------------------------
localLogin(form : NgForm){
  const authData : User = {phone : form.value.phone, password: form.value.password};
  this.http.post<{message:string, token:string, expiresIn: number}>("http://127.0.0.1:4000/api/user/login", authData)
  .subscribe(response =>{

//----------

this.http.get<{access_token:string, expires_in: string}>("https://cors-anywhere.herokuapp.com/https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
{headers: new HttpHeaders().set('Authorization', "Basic YW9JOXpnVWpHT2RGVmRtdHhIMGxzMEpKNmpEejZnTlk6THNMZXlhQ3ZvbkFuYjRvUA==")}). 
subscribe(response => {
  console.dir(response);
    if (response.access_token){
        this.poken = response.access_token;
        console.log ("this is safaricom token" + this.poken);
        this.storage.set('poken', response.access_token);
    }
})

//---------


    if (response.token) {
      this.token =  response.token; // set token => to be used by auth-interceptor
      //send positive login feedback
      this.authStatusListener.next(true);
            // retry with good access token


    } else {
      console.log("login unsuccessful");
      this.authStatusListener.next(false);
    }

  }) 
}

localPayment(form: NgForm) {


  let phone: string = form.value.phone;
  let phon = phone.substring(1);
  let phonx = "254"+phon;
  let y = '"' + phonx + '"';
  

  let data = {
    "BusinessShortCode": "174379",
    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjAwMzEwMDgxMzMy",
    "Timestamp": "20200310081332",
    "TransactionType": "CustomerPayBillOnline",
    "Amount": "5",
    "PartyA": "254724756240",
    "PartyB": "174379",
    "PhoneNumber": "254724756240",
    "CallBackURL": "https://webhook.site/117bd536-7930-4161-9d24-ced12a315a05",
    "AccountReference": "Suzie",
    "TransactionDesc": "Testing"
}

data.PartyA = phonx;
data.PhoneNumber =phonx;

  this.http.post<{errorCode: string, CustomerMessage:string}>("https://cors-anywhere.herokuapp.com/https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", data, 
  {headers: new HttpHeaders().set('Authorization', "Bearer "+this.poken)})
  .subscribe(response => {
    console.dir(response);
    if(response.errorCode) {

    }
    this.showAlert(response.CustomerMessage);
  })
}

//--------------------------------------------------------------

// ------------https test-------------------------

// testLogin(form : NgForm){
//   const authData : User = {phone : form.value.phone, password: form.value.password};
//   this.http.get<{}>("https://www.reddit.com/r/German/top.json?limit=20")
//   .subscribe(response =>{
//     if (response) {    
//       this.authStatusListener.next(true);
//       console.log('response exists');
//     } else {
//       console.log("login unsuccessful");
//       this.authStatusListener.next(false);
//     }

//   }) 
// }



//--------------------------------------------------------------

  //----------expose private token && private authlistener--------

  getToken(){
  return this.token;
  }

  getPoken() {
    return this.poken;
  }
  
  
  getauthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getRegisterListener() {
    return this.registerListener.asObservable();
  }

  private storeToken(token:string) {

    console.log(`this is token ${token}`);
     
  }

  showAlert(msg: string, msg2?) {
    const alert = this.alertCtrl.create({
      title: msg,
      subTitle: msg2,
      buttons: ['OK']
    });
    alert.present();
  }

}
