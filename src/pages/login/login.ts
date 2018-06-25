import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from "../home/home";
import * as firebase from "firebase";
import { RegisterPage } from '../register/register';
import { MenuController } from 'ionic-angular'; 

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email : string = '';
  password: string = '';
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public menuCtrl: MenuController
    ) {
      this.menuCtrl.get().enable(false);
  }
  
  login(){
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((user) => {
        console.log('login',result);     
        if (result) {
          this.navCtrl.setRoot(HomePage); /// subscribe =>> app.component.ts
        }
      })    
    }
    catch (e) {
      console.error(e);
    }
  }
  
  register(){
      this.navCtrl.push(RegisterPage);    
  }

}


