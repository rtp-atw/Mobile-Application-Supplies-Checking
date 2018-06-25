import { Component,ViewChild} from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { FirebaseListObservable,AngularFireDatabase } from "angularfire2/database";
import { deviceDetail } from "../../service/service";
import { DetailPage } from "../detail/detail";
import { QRScanner } from '@ionic-native/qr-scanner';
import { NFC } from '@ionic-native/nfc';
import { Subscription, Subscriber } from 'rxjs/Rx'
import { Keyboard } from '@ionic-native/keyboard';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-nfc',
  templateUrl: 'nfc.html',
})
export class NfcPage {
  @ViewChild('focusInput') myInput ;

  readingTag:   boolean   = false;
  subscriptions: Array<Subscription> = new Array<Subscription>();
  observableDeviceList: FirebaseListObservable<deviceDetail[]>;
  deviceScanList: deviceDetail[] = [];
  disableButton:   boolean   = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public angFire: AngularFireDatabase,
    public modalCtrl: ModalController,
    private nfc: NFC, 
    public keyboard: Keyboard,
    private alertCtrl: AlertController,
    public platform: Platform,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast
    ) {  
      //อ้างอิงที่อยู่ของฐานข้อมูลอุปกรณ์
      this.observableDeviceList = angFire.list('/devices');
      console.log('head',this.readingTag);
            
  }
  // QR CODE
  scan() {
  
    this.barcodeScanner.scan().then((barcodeData) => {
     
      if(barcodeData.text !== "" ) {
        this.findDeviceDetail(barcodeData.text);
      } else {
 
        this.toast.show('Product not found', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  keyboardDisable(){
    this.keyboard.close();
  }
  // Auto Focus Input เมื่อเข้ามาหน้า nfc
  ionViewWillEnter(){
    setTimeout(() => {
      this.myInput.setFocus();
    }, 1000);
    
  }
  // Auto Focus Input เมื่อโหลดหน้า nfc
  ionViewDidLoad() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 1000);
  }

  ionViewWillLeave() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  // ค้นหาอุปกรณ์ จาก ค่าที่รับมาได้ เปรียบเทียบกับข้อมูลในฐานข้อมูล
  findDeviceDetail(value){
    if(!value || value.length >= 8){    
      this.observableDeviceList.subscribe(devices => this.deviceScanList = devices.filter(device => device.tagUID === value));
    }
  }

  //ไปยังหน้าอุปกณ์
  navToDetailPage(deviceID){
    this.navCtrl.push(DetailPage, { deviceID } );
  }
  
  // เมื่อ Toggle ทำงานจะเช็คสถานะ NFC ของอุปกรณ์---1 (Not NFC READER!!)
  readTag() {
    this.platform.ready().then(() => { this.checkNFC();
    });
    console.log(this.readingTag);
     
  }
  // เมื่อ Toggle ทำงานจะเช็คสถานะ NFC ของอุปกรณ์---2 (Not NFC READER!!)
  checkNFC() {
    this.nfc.enabled().then(() => {
      this.readingTag = true;
      this.nfcRead();
    })
    .catch(err => {
      let alert = this.alertCtrl.create({
        subTitle:"NFC is not available on your phone or NFC function is off",
        buttons: [{ text: "OK" }, {
          text: "Setting",
            handler: () => {
              this.nfc.showSettings();
            }
        }]
      });alert.present();
      this.disableButton = true;
    });
  }
  //อ่านค่าจาก NFC (Not NFC READER!!)
  nfcRead(){
    this.subscriptions.push(this.nfc.addNdefListener()
      .subscribe(data => {
        if (this.readingTag) {
          let payload = data.tag.id;
          let tagContent = this.nfc.bytesToHexString(payload).toUpperCase();
          console.log("tag data", tagContent);
          this.findDeviceDetail(tagContent);
        } 
      },
      err => {
        alert('error');
      })
    );
  }

}
