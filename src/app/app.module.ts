import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,FabContainer } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from "../pages/login/login";
import { DetailPage } from "../pages/detail/detail";
import { AdddevicePage } from "../pages/adddevice/adddevice";
import { NfcPage } from "../pages/nfc/nfc";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { QRScanner } from '@ionic-native/qr-scanner';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { NFC, Ndef } from '@ionic-native/nfc';
import { DeviceFilterPipe } from '../pages/list/deviceFilter';
import { RegisterPage } from '../pages/register/register';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

//ตั้งค่าการเชื่อมต่อ Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyACabjh7hd9ZZM2uKnexKVlYFpkaw7mMM0",
  authDomain: "storage-846cc.firebaseapp.com",
  databaseURL: "https://storage-846cc.firebaseio.com",
  projectId: "storage-846cc",
  storageBucket: "storage-846cc.appspot.com",
  messagingSenderId: "126508740198"
};

// ประการการใช้งาน เครื่องมือ และหน้าต่างๆที่มีใน app
@NgModule({
  declarations: [ //Any pages
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    DetailPage,
    AdddevicePage,
    NfcPage,
    DeviceFilterPipe,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [ //Any pages just like "declarations".
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    DetailPage,
    AdddevicePage,
    NfcPage,
    RegisterPage
  ],
  providers: [ //Any tools
    StatusBar,
    SplashScreen,
    Geolocation,
    Keyboard,
    NFC,
    Ndef,
    NfcPage,
    FabContainer,
    FileChooser,
    File,
    QRScanner,
    BarcodeScanner,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler,}
  ]
})
export class AppModule {}
