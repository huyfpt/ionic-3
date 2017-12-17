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
  username: string;
  password: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public securityProvider: SecurityProvider,
    private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiginupPage');
  }
  register(){
    if((this.username == undefined || this.username == "") && (this.password == undefined || this.password == "")){
      alert("Username or Password is not empty");
      return;
    }
    
    let validateUsername = this.validateUsername(this.username);
    let validatePassword = this.validatePassword(this.password);
    if(validateUsername && validatePassword){
      let infoUser: Object = {
        username: this.username,
        password: this.password
      }; 
      this.securityProvider.signup(infoUser)
        .then((result) =>{
            this.checkSignup(result);
        });
    }         
  }

  checkSignup(res) {
    if(res.status == "200"){
      alert(res.message);
      this.navCtrl.setRoot(LoginPage);
    }else{
      alert(res.message);
    }
  }

  validateUsername(username) {
    if(username.search(/^([a-zA-Z]+[a-zA-Z0-9]+){3,30}$/) < 0){
      alert("Username length 3 to 30 characters");
      return false;
    }

    return true;
  }

  validatePassword(password) {
    if(password.search(/^[a-zA-Z0-9]{6,30}$/) < 0){
      alert("Password about 6 to 30 characters");
      return false;
    }

    return true;
  }
}