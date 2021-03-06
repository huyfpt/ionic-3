import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SiginupPage } from '../pages/siginup/siginup';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { WelcomePage } from '../pages/welcome/welcome';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { SecurityProvider } from '../providers/security/security';
import { IonicStorageModule } from '@ionic/storage';
import { CommonProvider } from '../providers/common/common';
import { GeoLocationProvider } from '../providers/geo-location/geo-location';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SiginupPage,
    ChangePasswordPage,
    WelcomePage,
    MapPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot({
     
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SiginupPage,
    ChangePasswordPage,
    WelcomePage,
    MapPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SecurityProvider,
    CommonProvider,
    GeoLocationProvider
  ]
})
export class AppModule {}
