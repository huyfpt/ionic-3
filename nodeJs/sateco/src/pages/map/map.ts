import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { CommonProvider } from '../../providers/common/common';
import { GeoLocationProvider } from '../../providers/geo-location/geo-location';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markerOld: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,
  public geolocationProvider: GeoLocationProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
    var tmp = this;
    setInterval(function(){
    	tmp.getDbDevice();
    },30000);

  }

  loadMap(){
 	this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 	  this.getDbDevice();
    }, (err) => {
      console.log(err);
    });
 
  }

addMarker(latLng){
  if(this.markerOld != undefined){
      this.deleteMarker(this.markerOld);
    }
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
   this.markerOld = marker;
}

deleteMarker(marker) {

    marker.setMap(null);
  }

getDbDevice(){
	console.log("Get Position");
	this.geolocationProvider.getDevices().subscribe(
		data=> this.showDbDevices(data));
}

showDbDevices(dbDivice){
	let latLng: Object = {
      lat: dbDivice.results[0].lat,
      long: dbDivice.results[0].long  
    }
    this.addMarker(latLng);
  }
}