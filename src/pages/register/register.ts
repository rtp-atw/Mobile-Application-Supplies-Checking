import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from "firebase";
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from 'firebase';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email :string ='';
  password: string ='';
  name:string = '';
  file: any
  storageRef = firebase.storage().ref();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public angFire: AngularFireDatabase,
    public loadingCtrl: LoadingController
  ) {
    
  }

  register(){
    try {
      const result = this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then((user: User) => {
        console.log('register',user);
        this.uploadPhoto().then((url) =>{
          user.updateProfile({
            photoURL: url,
            displayName: this.name
          });
          //this.navCtrl.pop();
        }); 
      })
        
    }
    catch (e) {
      alert(e);
      console.error(e);
    }
  }

  selectFile(e) {
    console.log(e);
    this.file = e.target.files[0]
  }

  uploadPhoto(): firebase.Promise<any> {
    console.log(this.file);
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 7000);
    return this.storageRef.child("Profile/" + this.file.name).put(this.file).then((snapshot) => {
      console.log(snapshot);
      return this.storageRef.child("Profile/" + this.file.name).getDownloadURL();
    });
  }

  backTologin(){
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
