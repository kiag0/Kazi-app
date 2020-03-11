import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TabxPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabx',
  templateUrl: 'tabx.html'
})
export class TabxPage {

  homeRoot = 'HomePage'
  accountRoot = 'AccountPage'
  payRoot = 'PayPage'
  extraRoot = 'ExtraPage'


  constructor(public navCtrl: NavController) {}

}
