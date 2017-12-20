import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { SecurityProvider } from '../../providers/security/security';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
   user_id: number;
   password: string;
   newPassword: string;
   confirm: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public securityProvider: SecurityProvider, public commonPovider: CommonProvider,
   public storage: Storage) {
    this.storage.get('user_id').then((val) => {
       this.user_id = val;
       console.log(val);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  changepass(){
    console.log("password: ", this.password, "new password", this.newPassword, "confirm", this.confirm);
    if((this.password == "" || this.password == undefined)){
      this.commonPovider.presentToast("Password is valid");
      return;
    }
    if((this.newPassword == "" || this.newPassword == undefined)){
      this.commonPovider.presentToast("New password is valid");
      return;
    }
    if(this.newPassword != this.confirm){
      this.commonPovider.presentToast("New password and confirm password do not match");
      return;
    }
    let infoUser: Object = {
      user_id: this.user_id,
      oldPassword: this.password,
      newPassword: this.newPassword,
      confirm: this.confirm
    };  
    this.securityProvider.changePass(infoUser)
        .then((result) =>{
            // this.checkLogin(result);
            console.log(result);
            this.checkPassworod(result);
        });
  }
  checkPassworod(res){
    if(res.status == '200'){
      console.log(res);
        this.commonPovider.presentToast(res.message);
        this.navCtrl.setRoot(HomePage);
      // this.storage.set('user_id', res.results[0].user_id);
    }else {
      this.commonPovider.presentToast(res.message);
    }
  }

}
