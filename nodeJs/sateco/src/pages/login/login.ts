import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  user_id: number;
  
  // message: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private securityProvider: SecurityProvider,
    public storage: Storage, public commonPovider: CommonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  loginUser(){
     if((this.user_name == undefined || this.user_name == "")){
      this.commonPovider.presentToast("Username is not empty");
      return; 
    }
    if((this.password == undefined || this.password == "")){
       this.commonPovider.presentToast("Password is not empty");
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
       this.storage.set('user_id', res.results[0].user_id);
      console.log(this.storage.set('user_id', res.results[0].user_id));
      this.navCtrl.push(HomePage);
      } else {
        this.commonPovider.presentToast(res.message);
      } 
  }
}


