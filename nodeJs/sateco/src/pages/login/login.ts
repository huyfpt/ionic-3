import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { SecurityProvider } from '../../providers/security/security';

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
    private securityProvider: SecurityProvider, private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  loginUser(){
     if((this.user_name == undefined || this.user_name == "") && (this.password == undefined || this.password == "")){
      this.presentToast("user_name or Password is not empty");
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

  presentToast(mes) {
    let toast = this.toastCtrl.create({
      message: mes,
      duration: 3000
    });
    toast.present();
  }
  checkLogin(res){
    if(res.status == '200'){
        this.navCtrl.push(HomePage);
      }else{
        this.presentToast(res.message);
      }
  }
}


