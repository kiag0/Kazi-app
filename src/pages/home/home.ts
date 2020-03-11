import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage,} from 'ionic-angular';
import { NavController,NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Socket } from 'ng-socket-io';

// special syntax for declaring google
declare var google;

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})




     export class HomePage {
        
      @ViewChild('map') mapElement: ElementRef; // refers to the map element in home.html
        public isRequested: boolean;
          public orderedService;
          map: any;
          pointA:any;
          pointX:any;
          pointC:any;
          pointD:any;
          start = 'chicago, il';
          end = 'Joplin, MO';
          mypos:any;
          avatars = [1,2,3,4,5,6,7];
          directionsService = new google.maps.DirectionsService;
          directionsDisplay = new google.maps.DirectionsRenderer;
          //@equator, rad1 = 1.2km, rad 2= 5km, rad3 = 11km;
           rad1 = 0.01; rad2 = 0.05; rad3 = 0.1; 
                
          //  polygon maker function...triangulates the area
                // polygonMaker(rlat, rlng, radius){
                //   var polyArr =[];
                //   var testArr =[];
                //   var a = {long:0,lat:0};
                //   var b = {long:0,lat:0};
                //   var c = {long:0,lat:0};
                //   var d = {long:0,lat:0};

                //   a.long = rlng - radius;
                //   a.lat= rlat + radius;
                //   b.long = rlng + radius;
                //   b.lat = a.lat;
                //   c.long = b.long;
                //   c.lat = rlat-radius;
                //   d.long = a.long;
                //   d.lat = c.lat;



                  
                //   polyArr.push(a,b,c,d);
                  
                //   return polyArr;

                // }
        
        
            constructor(public navCtrl: NavController,
                        public navParams: NavParams, 
                        public loadingCtrl: LoadingController, 
                        public alertCtrl: AlertController, 
                        public geolocation:Geolocation, 
                        public socket: Socket) {

                        this.isRequested = false;
                        this.orderedService = this.navParams.get('title');
        
             };
        
            // on requested
             requested(){
              this.isRequested = true;
             }
             
            // on cancel request
             requestedCancel(){
              this.isRequested = false;
             }
                 
             // After the view loads, initialize map
             ionViewDidLoad(){
               console.log('ionViewDidLoad HomerPage');
               this.enableGeolocation();
               //initialize map
               this.initMap();
               this.loadMe();
               //wait for location and reload
               const options = {timeout:130000, enableHighAccuracy:true};
               this.geolocation.getCurrentPosition(options).then(pos => {
                this.reloadMap(pos.coords.latitude, pos.coords.longitude, 11);
                this.pointX = {lat : pos.coords.latitude, lng: pos.coords.longitude}
                this.pointA = {lat: pos.coords.latitude + 0.001, lng: pos.coords.longitude + 0.011}
                this.calculateAndDisplayRoute();
               }, err => {
                  this.alertMe();
               })
               
             }




        
                     initMap(lat?,lng?) {
                        this.map = new google.maps.Map(this.mapElement.nativeElement, {
                        zoom: 8,
                        center: {lat:-1.982293, lng:37.418232},
                        disableDefaultUI: true,
                        });
                        this.directionsDisplay.setMap(this.map);

                     }

                     reloadMap(lat,lng,zoom) {

                      this.map = new google.maps.Map(this.mapElement.nativeElement, {
                        zoom: zoom,
                        center: {lat: lat, lng:lng},
                        disableDefaultUI: true,
                        });
                        this.directionsDisplay.setMap(this.map);

                     }

                     alertMe() {

                     }

                     enableGeolocation(){
                      let alert = this.alertCtrl.create({
                        title: 'Enable Geolocation in your device',
                        subTitle: 'Then restart app!',
                        buttons: ['OK']
                      });
                      alert.present();

                     }

                     loadMe() {
                      let loader = this.loadingCtrl.create({
                        content: "Locating.....",
                        duration : 3000,
                        showBackdrop : true,
                        enableBackdropDismiss : true  
                      });
                      loader.present();
                     }

                     
                       reload() {
 
                        const options = {timeout:130000, enableHighAccuracy:true};
                        this.geolocation.getCurrentPosition(options).then(pos => {
                          let alert = this.alertCtrl.create({
                            title: 'We found your Location',
                            buttons: ['OK']
                          });
                          alert.present();
                         this.reloadMap(pos.coords.latitude, pos.coords.longitude, 11);
                        
                        }, err => {
                           this.alertMe();
                        })

                       }
            
                       
        




                      // calculateAndDisplayRoute() {
                      // this.directionsService.route({
                      // origin: this.start,
                      // destination: this.end,
                      // travelMode: 'DRIVING'
                      // }, (response, status) => {
                      // if (status === 'OK') {
                      // this.directionsDisplay.setDirections(response);
                      // } else {
                      // window.alert('Directions request failed due to ' + status);
                      // }
                      // });
                      // }
         
        
        // geolocation and map initialisation
              // initMap(){
                      
              //   //ionic loder


              //   //polygon visualiser
              //   var drw;
              //   var drwx;
                  
              //   //ionic alert

                          
                          
                  //geolocation  
                  //         let options = {timeout:100000, enableHighAccuracy:true}
                  //         this.geolocation.getCurrentPosition(options).then((position) => {
                       
                  //           console.log(position);

                  //           drw = this.polygonMaker(position.coords.latitude, position.coords.longitude, this.rad1);

                  //           drwx  = [
                  //             {lat: drw[0].lat, lng:drw[0].long},
                  //             {lat: drw[1].lat, lng:drw[1].long},
                  //             {lat: drw[2].lat, lng:drw[2].long},
                  //             {lat: drw[3].lat, lng:drw[3].long}
                  //           ];

                  //           let reverser = [];
                  //           reverser[0] = position.coords.longitude;
                  //           reverser[1] = position.coords.latitude;
                  //           this.mypos = reverser;

                  //           this.socket.emit('usercoords', reverser);
                  //               /* 
                  //               /----------------creating coordinates for Geojson object from our position----------
                  //               */
                                  
        
        
                  //               //-------------------------------------------------------------------------------------
        
                  //           let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                  //           console.log("Geolocation is returned ok --");
                  //           loader.present();
                  //           let mapOptions = {
                  //             center: latLng,
                  //             zoom: 15,
                  //             mapTypeId: google.maps.MapTypeId.ROADMAP,
                  //             disableDefaultUI : true
                  //           }
                            
                  //           this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions), (response, status) =>{
        
    
                                  
        
                  //                 if (status=== "OK"){
                  //                   console.log("status returned ok --");
                  //                   loader.dismiss();
                  //                 }
                  //                 else {
                  //                   console.log("status is not equal to ok --");
                  //                   alert.present();
                  //                 }
                  //               }
                  //               this.directionsDisplay.setMap(this.map);

                                
                  //               // Construct the polygon.
                  //                 var bermudaTriangle = new google.maps.Polygon({
                  //                   paths: drwx,
                  //                   strokeColor: '#FF0000',
                  //                   strokeOpacity: 0.8,
                  //                   strokeWeight: 2,
                  //                   fillColor: '#FF0000',
                  //                   fillOpacity: 0.35
                  //                 });
                  //                 bermudaTriangle.setMap(this.map);
        
                                
                  //               //
                            
                       
                  //                 }, (err) => {
                  //                   console.log("Geolocation is not availabe :( ");
                  //                   loader.dismiss();
                  //                   alert.present(); 
                  //                   console.log(err);
                  //                 }); 


                                  
                              
                      
                                 
                      
                  // }



                  calculateAndDisplayRoute() {
                    this.directionsService.route({
                    origin: this.pointX,
                    destination: this.pointA,
                    travelMode: 'DRIVING'
                    }, (response, status) => {
                    if (status === 'OK') {
                    this.directionsDisplay.setDirections(response);
                    } else {
                    window.alert('Directions request failed due to ' + status);
                    }
                    });
                    }
          
                  festConnect(){
                      console.log("peripheral connected");
                      this.socket.connect();
                      this.socket.emit('chat message', this.start);
                      this.socket.on('news', function (data) {
                  
                          console.log(data);
                      });
                
                
                    }

                  toPayment() {
                    this.navCtrl.push('PaymentPage');
                  }  
        

        
        
        
        
                      
            
        
        }// end of class