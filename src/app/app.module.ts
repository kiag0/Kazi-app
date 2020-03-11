import { IonicStorageModule } from '@ionic/storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {Facebook} from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';


import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

let config: SocketIoConfig = { 
  url: 'http://127.0.0.1:4000', 
  options: {transport : ['websocket'] } 
};



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarsProvider } from '../providers/cars/cars';
import { WorkerServiceProvider } from '../providers/worker-service/worker-service';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';



@NgModule({
  declarations: [
    MyApp,

  
  ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   

  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    Facebook,
 //   [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorProvider, multi: true}],
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    CarsProvider,
    WorkerServiceProvider,
    AuthInterceptorProvider
  ]
})
export class AppModule {}
