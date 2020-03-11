import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WregisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wregister',
  templateUrl: 'wregister.html',
})
export class WregisterPage {

  firstName;
  secondName;
  gender;
  DOB;
  expertise;
  permLocation;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WregisterPage');
  }

  sendLogin() {
    this.navCtrl.push('DloginPage')
  }


}
