import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


import { GovhomePage } from '../govhome/govhome';
import { ManfhomePage } from '../manfhome/manfhome';
import { CushomePage } from '../cushome/cushome';
import { DealerPage } from '../dealer/dealer';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {};
  creds: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    console.log(this.credentials);
    localStorage.setItem("credentials", JSON.stringify(this.credentials));
    var self = this;
    if (this.credentials["username"].match(/gov\w+/g) || this.credentials["username"].match(/Gov\w+/g)) {
      self.navCtrl.setRoot(GovhomePage);
    }
    else if (this.credentials["username"].match(/man\w+/g) || this.credentials["username"].match(/Man\w+/g)) {
      self.navCtrl.setRoot(ManfhomePage);
    }
    else if (this.credentials["username"].match(/deal\w+/g) || this.credentials["username"].match(/Deal\w+/g)) {
      self.navCtrl.setRoot(DealerPage);
    }
    else if (this.credentials["username"].match(/cus\w+/g) || this.credentials["username"].match(/Cus\w+/g)) {
      self.navCtrl.setRoot(CushomePage);
    }
    else if (this.credentials["username"].match(/0\w+/g) || this.credentials["username"].match(/Cus\w+/g)) {
      self.navCtrl.setRoot(CushomePage);
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Invalid Login',
        subTitle: 'Please check the credentials',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

}
