import { Component } from '@angular/core';
import { NavController, NavParams,AlertController  } from 'ionic-angular';
import * as firebase from "firebase";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { deviceDetail } from "../../service/service";
import * as moment from 'moment';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  id: number;
  storageRef = firebase.storage().ref();
  img: any; 
  devicelist: FirebaseListObservable<any>;
  detail: deviceDetail = {
    number : 0
  };
  isReady = false;
  myDate: String;
  file: any; picUrl: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public angFire: AngularFireDatabase,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      // เรียก วันที่
      this.myDate = moment().format('LLLL'); 

      this.id = this.navParams.data.deviceID;

      // Reference ตำแหน่งที่อยู่ของ Database
      this.devicelist = angFire.list('/devices');
      
      // เรียกข้อมูลจาก ID
      const deviceDataRef: firebase.database.Reference = firebase.database().ref('/devices/'+this.id);
      deviceDataRef.on('value', personSnapshot => {   
        this.detail = personSnapshot.val();
        this.isReady = true;
        this.img = this.detail.imgurl;
      });

  }

  // Alert Good
  goodConfirm(id:string) {
    let alert = this.alertCtrl.create({
      title: 'Confirm update',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sure',
          handler: () => {
            this.devicelist.update(id,{
              lastUpdate: this.myDate,
              status : 'Good'
            });
          }
        }
      ]
    });alert.present();
  }

  // Alert Fix
  fixConfirm(id:string) {
    let alert = this.alertCtrl.create({
      title: 'Confirm update',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sure',
          handler: () => {
            this.devicelist.update(id,{
              lastUpdate: this.myDate,
              status : 'Need to fix'
            });
          }
        }
      ]
    });
    alert.present();
  }
  // Alert Reject
  rejectConfirm(id:string) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Reject',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sure',
          handler: () => {
            this.devicelist.update(id,{
              lastUpdate: this.myDate,
              status : 'Reject'
            });
          }
        }
      ]
    });
    alert.present();
  }

  selectFile(e) {
    this.file = e.target.files[0]
  }

  uploadPhoto(id:string) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 7000);
    this.storageRef.child("Device/" + this.file.name).put(this.file).then((snapshot) => {
      console.log(snapshot);
      this.storageRef.child("Device/"+ this.file.name).getDownloadURL().then((url) => {
        this.picUrl = url;      
        console.log('url', this.picUrl);
        this.devicelist.update(id,{
          imgurl: this.picUrl
        });
      });
    });
  }

  // กดค้างเพื่อ Alert แก้ไข TagUID
  pressEventTag(e,key){    
    let alert = this.alertCtrl.create({
      title: 'Do you want to change this tag UID?',
      message: 'Please scan new TAG...',
      cssClass: 'alertTAG',
      inputs: [
        {
          name: 'text',
          placeholder: this.detail.tagUID,
          type: 'text'
        }
      ],
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
          handler: data => {
            if(data.text !== ""){
              this.devicelist.update(key,{
                tagUID : data.text
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

  // กดค้างเพื่อ Alert แก้ไข Location
  pressEventLocation(e,key){    
    let alert = this.alertCtrl.create({
      title: 'Do you want to change location of this device?',
      message: 'Please edit new location',
      cssClass: 'alertTAG',
      inputs: [
        {
          name: 'text',
          placeholder: this.detail.location.toString(), //(ถ้ารูปแบบชุดข้อมูลมีการเปลี่ยนแปลงต้องแก้ไขส่วนนี้ด้วย)
          type: 'text'
        }
      ],
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
          handler: data => {
            if(data.text !== ""){
              this.devicelist.update(key,{
                location : data.text //(ถ้ารูปแบบชุดข้อมูลมีการเปลี่ยนแปลงต้องแก้ไขส่วนนี้ด้วย)
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

}



