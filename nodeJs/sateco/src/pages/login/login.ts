import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { SecurityProvider } from '../../providers/security/security';
import { CommonProvider } from '../../providers/common/common';

// import { Http } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user_name: string;
  password: string;
  
  // message: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private securityProvider: SecurityProvider, private toastCtrl:ToastController,
    public storage: Storage, public commonPovider: CommonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  loginUser(){
     if((this.user_name == undefined || this.user_name == "") && (this.password == undefined || this.password == "")){
      this.commonPovider.presentToast("username or Password is not empty");
      return;
    }
    let infoUser: Object = {
      user_name: this.user_name,
      password: this.password
    };      
    this.securityProvider.login(infoUser)
        .then((result) =>{
            this.checkLogin(result);
        });
  }

 
  checkLogin(res){
    if(res.status == '200'){
       this.storage.set('user_name', res.results[0].user_name);
      // console.log(name);
      this.navCtrl.push(HomePage);
      } else {
        this.commonPovider.presentToast(res.message);
      } 
  }
}


