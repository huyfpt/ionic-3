import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import {LoginPage} from '../login/login';

import { SecurityProvider } from '../../providers/security/security';
/**
 * Generated class for the SiginupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-siginup',
  templateUrl: 'siginup.html',
})
export class SiginupPage {
  resposeData: any;
  userData = {"user_name":"", "password":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public securityProvider: SecurityProvider,
    private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiginupPage');
  }
  register(){
    if(this.userData.user_name && this.userData.password ){
      //Api connections
    this.securityProvider.postData(this.userData).then((result) =>{
    this.resposeData = result;
    // if(this.resposeData.userData){
      // console.log(this.resposeData);
      localStorage.setItem('userData', JSON.stringify(this.resposeData) )
      this.navCtrl.push(LoginPage);
    // }
    
    
    }, (err) => {
      //Connection failed message
    });
  }
  else {
    this.presentToast("Give valid information.");
  }
  
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}

