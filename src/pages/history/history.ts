import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';



/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  history: any;
  tempGunMap = {
    guns: []
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.history = JSON.parse(localStorage.getItem('history'));
    this.history=this.history.reverse();
    console.log(typeof (this.history));
    console.log("history from local\n" + JSON.stringify(this.history));

    for (let i = this.history.length-1; i >=0; i--) {
      console.log("i= " + i);
      this.tempGunMap.guns.push([this.history[i]["Value"], this.history[i]["Timestamp"]])
    };
    console.log("tempGun")
    console.log('temp'+JSON.stringify( this.tempGunMap));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }
  dismiss() {
    this.navCtrl.push(LoginPage);
  }

}
