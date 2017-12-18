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
  user_name: string;
  password: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public securityProvider: SecurityProvider,
    private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiginupPage');
  }
  register(){
    if((this.user_name == undefined || this.user_name == "") && (this.password == undefined || this.password == "")){
       this.presentToast("user_name or Password is not empty");
      return;
    }
    
    let validateuser_name = this.validateuser_name(this.user_name);
    let validatePassword = this.validatePassword(this.password);
    if(validateuser_name && validatePassword){
      let infoUser: Object = {
        user_name: this.user_name,
        password: this.password
      }; 
      this.securityProvider.signup(infoUser)
        .then((result) =>{
          this.checkSignup(result);
        });
    }         
  }

  presentToast(mes) {
    let toast = this.toastCtrl.create({
      message: mes,
      duration: 3000
    });
    toast.present();
  }

  validateuser_name(user_name) {
    if(user_name.search(/^[a-zA-Z0-9]{3,30}$/) < 0){
       this.presentToast("username length 3 to 30 characters");
      return false;
    }

    return true;
  }

  validatePassword(password) {
    if(password.search(/^[a-zA-Z0-9]{6,30}$/) < 0){
       this.presentToast("Password about 6 to 30 characters");
      return false;
    }

    return true;
  }
  checkSignup(res){
    if(res.status == '200'){
        this.navCtrl.push(LoginPage);
      }else{
        this.presentToast(res.message);
      }
  }
}