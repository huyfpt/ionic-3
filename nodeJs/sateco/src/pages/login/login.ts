import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  username: string;
  password: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private securityProvider: SecurityProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  loginUser(){
     if((this.username == undefined || this.username == "") && (this.password == undefined || this.password == "")){
      alert("Username or Password is not empty");
      return;
    }

    let infoUser: Object = {
      username: this.username,
      password: this.password
    };      
    this.securityProvider.login(infoUser)
        .then((result) =>{
            this.checkLogin(result);
        });
  }

  checkLogin(res) {
    if(res.status == "200"){
      this.navCtrl.setRoot(HomePage);
    }else{
      alert(res.message);
    }
  }
}


