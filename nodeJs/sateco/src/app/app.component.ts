import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { ChangePasswordPage } from '../pages/change-password/change-password';
// import { LoginPage } from '../pages/login/login';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;
  icon: string[];
  pages: Array<MenuItem>;
  home: Array<MenuItem>;
  logout: Array<MenuItem>;
  map: Array<MenuItem>;
  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.home = [
      {title: 'Home', component: HomePage, icon: 'home'}
    ]
    this.pages = [
      { title: 'Change Password', component: ChangePasswordPage, icon: 'git-compare' },
    ];
    this.logout = [
      { title: 'Logout', component: WelcomePage, icon: 'log-out' }
    ];
    this.map = [
      { title: 'View Map', component: MapPage, icon: 'map' }
    ];

  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openHome() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(HomePage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
 
  logoutSession(){
    // clearInterval(this.maps.get_position);
    this.nav.setRoot(WelcomePage);
  } 

  mapClick(){
    this.nav.setRoot(MapPage);
  }
}
