import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
/**
 * Generated class for the ChooserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chooser',
  templateUrl: 'chooser.html',
})
export class ChooserPage {

  workers = ['Plumber', 'Electrician', 'Mason', 'Cleaner', 'Roofer', 'Unskilled','Nanny','E-Repair', 'Cook', 'Gardener'];

  start = "aud=gustine kiago"
  constructor(public socket: Socket, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooserPage');
    this.testConnect();
  }

  toMap(worker:string){
    let orderedService = {title:worker};
    const prompt = this.alertCtrl.create({
      title: 'More Info',
      message: `Enter a description of the job you want the ${orderedService.title} to do`,
      inputs: [
        {
          name: '',
          placeholder: 'Work title'
        },
        {
          name: "",
          placeholder: `description`
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.navCtrl.push('HomePage', orderedService);
          }
        }
      ]
    });
    prompt.present();
    
  }

  testConnect(){
    this.socket.connect();
    this.socket.emit('chatmessage', this.start);
    this.socket.on('news', function (data) {

      console.log(data);
  });
  
    
  }

  



}
