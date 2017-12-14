import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {LoginPage} from '../login/login';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiginupPage');
  }
  register(){
  	this.navCtrl.push(LoginPage);
  }
}
