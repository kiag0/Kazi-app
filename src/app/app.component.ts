import { Socket } from 'ng-socket-io';
import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

LoadingController


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
rootPage: any;
loading: any;





  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public auth:AuthProvider, public lctrl : LoadingController, public socket: Socket) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need. 
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.rootPage = "LoginPage";
    // this.auth.login().then((isLoggedIn)=>{

    //   this.presentLoadingDefault();

    //     if (isLoggedIn ) {
    //       this.rootPage = "HomePage";
    //     } else { 
    //       
    //     }

    //     this.loading.dismiss();
    //         });
 
  }



  presentLoadingDefault() {
    this.loading = this.lctrl.create({
      content: 'Authenticating...',
    
    });
  
    this.loading.present();
  
    
  }
}


 