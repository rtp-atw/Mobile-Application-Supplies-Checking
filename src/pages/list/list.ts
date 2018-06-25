import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { FirebaseListObservable,AngularFireDatabase } from "angularfire2/database";
import { DetailPage } from "../detail/detail";
import { deviceDetail } from "../../service/service";
import { Subject } from 'rxjs/Subject'

import * as firebase from "firebase";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  
  devicelist: deviceDetail[];
  originalDeviceList: FirebaseListObservable<deviceDetail[]>;
  myInput:string;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public angFire: AngularFireDatabase,
    public alertCtrl: AlertController,) {

      //อ้างอิงที่อยู่ของฐานข้อมูลอุปกรณ์
      this.originalDeviceList = angFire.list('/devices');
      this.originalDeviceList.subscribe(devices => {
        this.devicelist = devices;
      });  
  }
  //ลบข้อมูลอุปกรณ์ตัวนั้นๆตาม (deviceID)
  deleteDevice(deviceID):void {
    let prompt = this.alertCtrl.create({
      title: 'Delete Device',
      buttons: [
        {
          text: "Delete",
          handler: data => {
            this.originalDeviceList.remove(deviceID);
          }
        },
        {
          text: "Cancel",
          handler: data => {
            console.log("cancel click");
          }
        }
      ]
    });prompt.present();
  }
  // เข้าดูข้อมูลของ อุปกรณ์ ตัวนั้นๆ
  deviceDetail(deviceID) {
    console.log(deviceID);
    this.navCtrl.push(DetailPage, { deviceID });
  }

}

