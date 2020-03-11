import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public auth:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  Upay(form: NgForm) {
    
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
    this.auth.localPayment(form); 
    waiting.dismiss();
  }

    // validator
    validator(msg?: string) {
      const toast = this.toastCtrl.create({
        message: msg || 'Enter both phone no!',
        duration: 4000,
        position: 'top',
        cssClass: 'toastStyles'
      });
  
      toast.present();
     }

}
