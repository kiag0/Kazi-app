import { AuthProvider } from './../../providers/auth/auth';
import { Socket } from 'ng-socket-io';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email = '';
  password = '';
  password2 = '';
  start = "Ave Maria";

  constructor(public navCtrl: NavController, public navParams: NavParams, public socket : Socket, public auth : AuthProvider) {
  }

  ionViewDidLoad() {
   console.log('ionViewDidLoad RegisterPage');
  }
  
 

  //----------------register logic srart ------------------------------------------------
  // testConnect(){
    
  //   this.auth.localRegister(this.email,this.password);
  //   console.log("peripheral connected");
  //   this.socket.connect();
  //   this.socket.emit('chat message', 'jigga');

  
    
  //   this.socket.on('successRegister', (data) => {

  //     this.navCtrl.push('LoginPage');
  //     console.log("sussessful: account registered.")
  //   });

  //   this.socket.on('failRegister',  (data) => {

  //     console.log("failedRegister : " + data);

  //   });

  //   this.socket.on('justerror', (data) => {

  //     console.log("just error " + data);
  //   });

  // }





 
   //-----------------login logic end ----------------------------------------------------

}
