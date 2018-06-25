import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase";
import { deviceDetail } from "../../service/service";
import { LoadingController } from 'ionic-angular';
import { empty } from 'rxjs/Observer';

@Component({
  selector: 'page-adddevice',
  templateUrl: 'adddevice.html',
})
export class AdddevicePage {

  deviceDetail: deviceDetail = {};

  key: any;
  devicelist: FirebaseListObservable<any>;
  file: any;
  storageRef = firebase.storage().ref();
  picUrl: any;
  myDate: String = new Date().toISOString();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public angFire: AngularFireDatabase,
    public loadingCtrl: LoadingController) {
      
    this.devicelist = angFire.list('/devices');
  }
  ionViewDidLoad() {
        
  }

  selectFile(e) {
    this.file = e.target.files[0]
  }
  uploadPhoto(key) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 7000);
    this.storageRef.child("Device/" + this.file.name).put(this.file).then((snapshot) => {
      console.log(snapshot);
      this.storageRef.child("Device/" + this.file.name).getDownloadURL().then((url) => {
        this.picUrl = url;      
        console.log('url', this.picUrl);
        this.devicelist.update(key,{
          imgurl: this.picUrl
        });
      });this.navCtrl.pop();
    });
  }
  
  // Function การเพิ่มข้อมูล
  addDevice() { 
    var data = this.devicelist.push(Object.assign(
      { //ค่าเริ่มต้นเมื่อไม่มีการใส่ข้อมูล (ถ้ารูปแบบชุดข้อมูลมีการเปลี่ยนแปลงต้องแก้ไขส่วนนี้ด้วย)
        number: 0,
        serialNumber: 0,
        date: "",
        name: "",
        detail: "",
        location: 0,
        pricePerUnit: "",
        transferStatus: "",
        oldSerialNumber : 0,
        remark:"",
        imgurl : "",
        file: "",
        tagUID:"",
        status:""
      },this.deviceDetail
    ));
    // เรียก Key และเพิ่มเข้าไปในข้อมูลแต่ละชุด เพื่อน้ำ Key ไปใช้งานต่อ
    this.key = data.ref.key;
    this.devicelist.update(this.key,{
      date: this.myDate,
      key : this.key
    });
    console.log(this.key);
    if(this.file){
      this.uploadPhoto(this.key);
    }
    else {
      this.navCtrl.pop();
    }
    
  }  
}
