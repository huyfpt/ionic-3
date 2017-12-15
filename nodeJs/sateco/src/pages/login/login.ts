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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private securityProvider: SecurityProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  loginUser(){
    // this.getDataJson();
  	this.navCtrl.setRoot(HomePage);
  }
  getDataJson() {
    this.securityProvider.getData()
        .then((result) =>{
            this.showData(result);
    });
  }
  showData(user) {
    console.log(user);
  }

}



