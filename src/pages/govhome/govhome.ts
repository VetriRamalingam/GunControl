import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GovsecscreenPage } from '../govsecscreen/govsecscreen';
import { LoginPage } from '../login/login';

/**
 * Generated class for the GovhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-govhome',
  templateUrl: 'govhome.html',
})
export class GovhomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovhomePage');
  }
  manfClick() {
    this.navCtrl.push(GovsecscreenPage);
  }
  dealClick() {
    this.navCtrl.push(GovsecscreenPage);
  }
  dismiss() {
    this.navCtrl.push(LoginPage);
  }
}
