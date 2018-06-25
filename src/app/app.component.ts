import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from "../pages/login/login";
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AdddevicePage } from '../pages/adddevice/adddevice';
import { NfcPage } from '../pages/nfc/nfc';
import * as firebase from "firebase";
import { LoadingController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  account : string = "";
  pages: Array<{title: string, component: any, icon:any}>;
  databaseStatus : string;
  storageRef = firebase.storage().ref();
  userAvatar : string = "";
  userName:string = "";

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public angFire: AngularFireDatabase,
    ) {

      //ระบุบตัวผู้ใช้งาน
      this.afAuth.authState.subscribe(o=>{ 
        if(o) {
          console.log('o',o);
          this.account = o.email;
          this.userAvatar = o.photoURL;
          this.userName = o.displayName;
        }

      });

      //แจ้งสถานะการเชื่อมต่อฐานข้อมูล
      var connectedRef = firebase.database().ref(".info/connected");
      connectedRef.on("value", (snap) => {
        if (snap.val() === true) {
          this.databaseStatus = "Connected";
        } else {
          this.databaseStatus ="Not connected";
        }
      });

      //ตั้งค่าหน้าหลัก เมื่อมีการ Authentication
      this.afAuth.authState.subscribe(auth => {
        if (!auth)  
          this.rootPage = LoginPage;
        else
          this.rootPage = HomePage;   
      });

      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
      });

      // ตั้งค่าหน้า Menu Toggle
      this.pages = [
        { title: 'Home', component: HomePage ,icon: 'home' },
        { title: 'List', component: ListPage, icon: 'book' },
        { title: 'Add Device', component: AdddevicePage, icon: 'add' },
        { title: 'NFC For Update', component: NfcPage ,icon: 'barcode'}
      ];

  }

  // function push ไปยังหน้าที่เลือก 
  openPage(page) {
    this.nav.push(page.component);
  }

  // Function Logout
  logout(){
    this.afAuth.auth.signOut().then(()=>{
      this.nav.setRoot(LoginPage);
    });
    console.log('logout');
  }

}
