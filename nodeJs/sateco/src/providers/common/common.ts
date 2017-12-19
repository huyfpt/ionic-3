import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

  constructor(public http: HttpClient,  private toastCtrl:ToastController) {
    console.log('Hello CommonProvider Provider');
  }
 presentToast(mes) {
    let toast = this.toastCtrl.create({
      message: mes,
      duration: 3000
    });
    toast.present();
  }
}
