import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { ListPage } from "../list/list";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { AdddevicePage } from "../adddevice/adddevice";
import { NfcPage } from "../nfc/nfc";
import { AngularFireAuth } from 'angularfire2/auth';
import * as moment from 'moment';
import { dataBroadcast } from "../../service/service";
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userAvatar : string = "";
  textBroadcast : FirebaseListObservable<any[]>;
  myDate: String; clock:any;
  private account : string;

  dataBraodcast : dataBroadcast;
  dateTime : any;

  constructor(public navCtrl: NavController,
    public angFire: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController
    ) {
      //ระบุบตัวผู้ใช้งาน
      this.afAuth.authState.subscribe(o=>{ 
        if(o) {
          console.log('o',o);
          this.account = o.email;
          this.userAvatar = o.photoURL;
        }
      });
      
      this.menuCtrl.get().enable(true);
      this.myDate = moment().format('LLLL');
      this.textBroadcast = angFire.list('/textBraodcast');
      console.log(this.myDate);

  }
  // Digital Clock
  ngOnInit() {  
    this.clock = setInterval( () => { 
           this.clock = moment().format('LTS');; 
    }, 1000);
  }

  // เปลี่ยนหน้า
  pushListPage() { 
    this.navCtrl.push(ListPage);
  }
   // เปลี่ยนหน้า
  pushAddDevice() {
    this.navCtrl.push(AdddevicePage);
  }
  // เปลี่ยนหน้า
  pushNfcPage() {
    this.navCtrl.push(NfcPage);
  }
  
  // โพสแจ้งเตือน
  addPost(){
    let alert = this.alertCtrl.create({
      title: 'Post',
      inputs: [
        {
          name: 'text',
          placeholder: 'Text',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Post',
          handler: data => {
            console.log(data);
            this.dataBraodcast = {
              text : data.text,
              date : this.myDate,
              user : this.account,
              avatar: this.userAvatar,
              key : ""
            }
            var ref = this.textBroadcast.push(this.dataBraodcast);
            this.textBroadcast.update(ref.key,{
              key : ref.key
            })
          }
        }
      ]
    });
    alert.present();
  }
  // ลบโพสแจ้งเตือน
  pressEventDeletePost(e,key){    
      let alert = this.alertCtrl.create({
        title: 'Confirm delete',
        message: 'Do you want to delete this post?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.textBroadcast.remove(key);
            }
          }
        ]
      });
      alert.present();
    }

}

