//import { Network } from '@ionic-native/network';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';





@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private authListenerSub : Subscription; 
  disconnectSubscription: Subscription; 
  isAuthenticated : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private loadingCtrl : LoadingController, private toastCtrl: ToastController,
               private auth: AuthProvider) {


  }


  sendForgot() {
    this.navCtrl.setRoot('ForgotPage');
  }

    //-----create account instead-------------------------
    
    sendRegister() {
      this.navCtrl.setRoot('SignupPage');
    }
    //----------------------------------------------------

    //-----when the page loads----------------------------------------
     ionViewDidEnter(){

      let loading = this.loadingCtrl.create({
        content: 'Authenticating......'
      });
      
      this.authListenerSub = this.auth.getauthStatusListener()
      .subscribe(response=>{
        loading.present();
        this.isAuthenticated = response;
        if(this.isAuthenticated !== false){
          loading.dismiss();
          this.navCtrl.setRoot('ChooserPage');
          } else{
            console.log('login failed')
          }
      });
    }
  //------------------------------------------------------------------

  //------------unsubscribe for authlistener obs----------------------
    ngOnDestroy(){
    //  this.authListenerSub.unsubscribe(); 
    //  this.disconnectSubscription.unsubscribe();
    }
  //------------------------------------------------------------------
   

  Ulogin(form: NgForm) {
    
    console.log(form.value.phone);
    const phone = form.value.phone;
    const ten = /^\d{10}$/;
    const slice = phone[0] + phone[1];
    const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    console.log(typeof(slice) + slice);
    if ( !phone.match(ten)) {
      this.validator('Phone number not valid use format: 07xx xxx xxx');
      return;
    }

    if (!phone.match(phoneno)) {
      alert('wow')!
      return;
    } 

    if (slice != '07') {
      this.validator('Enter a valid phone number use format: 07xx xxx xxx');
      return;
    }

    if(form.invalid){
      this.validator();
      return;
    }
    // show instant loading for good ui
    let waiting = this.loadingCtrl.create({
      content: 'Working......'
    });
    waiting.present();
    // actual loading
    this.auth.localLogin(form); 
    waiting.dismiss();
  }

  // validator
   validator(msg?: string) {
    const toast = this.toastCtrl.create({
      message: msg || 'Enter both phone and password',
      duration: 4000,
      position: 'top',
      cssClass: 'toastStyles'
    });

    toast.present();
   }


   giveOptions() {
     this.navCtrl.push('Register2Page');
   }

}
