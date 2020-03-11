import { Subscription } from 'rxjs';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the Register2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html',
})
export class Register2Page implements OnDestroy{

  pet: string = "puppies";
  private RegListenerSub : Subscription; 
  isRegistered : boolean = false;
  private authListenerSub : Subscription; 
  disconnectSubscription: Subscription; 
  isAuthenticated : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl : LoadingController, private toastCtrl: ToastController, private auth: AuthProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Register2Page');
  }


    //-------when page finishes loading-------------------------------
    ionViewDidEnter(){
      if (this.pet === "puppies") {

        let loading = this.loadingCtrl.create({
          content: 'Authenticating......'
        });
        
        this.authListenerSub = this.auth.getauthStatusListener()
        .subscribe(response=>{
          loading.present();
          this.isAuthenticated = response;
          if(this.isAuthenticated !== false){
            loading.dismiss();
            this.navCtrl.setRoot('WdashboardPage');
            } else{
              console.log('login failed')
            }
        });
        
      } else {
        
      
      let loading = this.loadingCtrl.create({
        content: 'Registering......'  
      });

      console.log('here 1');
      let waiting = 
      this.RegListenerSub = this.auth.getRegisterListener()
      .subscribe(response=>{
        console.log('here 2');
        loading.present();
        this.isRegistered = response;
        if(this.isRegistered !== false){
          console.log('here 3');
          this.infoToast();
          loading.dismiss();
          //this.navCtrl.push('LoginPage');
          this.pet = "kittens"
          } else{
            this.infoToast('Account Creation Failed');
          }
      });
     }
    }
  
  
  //-----------------------------------------------------


//-----when register -----------------------------------
Signup(form : NgForm) {

  const phone = form.value.phone;
  const pass = form.value.password;
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

  if (pass.length < 4) {
    this.validator('Password Too short! Use four or more characters')
    return;
  }

  if(form.invalid){
    this.validator();
    return;
  }
  // show instant loading for good ui
  console.log('here xx');
  this.pet = 'puppies';
  let waiting = this.loadingCtrl.create({
    content: 'Working......'
  });
  waiting.present();
  // actual loading
  this.auth.localRegister(form); 
  waiting.dismiss();
   
}

//--------------------------------------------------------
//-------on login-----------------------------------------

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


//--------------------------------------------------------
//-----validator toast------------------------------------
validator(msg?: string) {
  const toast = this.toastCtrl.create({
    message: msg || 'Enter both phone and password',
    duration: 4000,
    position: 'top',
    cssClass: 'toastStyles'
  });

  toast.present();
 }

  //-----------other toast----------------------------------
  infoToast(msg?:string) {
    const toast = this.toastCtrl.create({
      message: msg || 'Account created.   You can log in now',
      duration: 4000,
      position: 'top',
      cssClass: 'toastStyles'
    });

    toast.present();
   }
  //---when the page leaves--------------------------------
 
  ngOnDestroy() {
    if (this.pet === "puppies") {
      this.authListenerSub.unsubscribe(); 
      this.disconnectSubscription.unsubscribe();
    } else {
      this.RegListenerSub.unsubscribe();
    }
    
  }



  sendLogin() {
    this.navCtrl.setRoot('LoginPage');
  }

  

}
