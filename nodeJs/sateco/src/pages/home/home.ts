import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SecurityProvider } from '../../providers/security/security';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	user_name :string
  constructor(public navCtrl: NavController, public securityProvider: SecurityProvider, public storage: Storage) {
  	this.storage.get('user_name').then((val) => {
       this.user_name = val;
       console.log(val);
    });
    
  }

}
