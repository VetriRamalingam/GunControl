import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import {GdetailsPage} from '../gdetails/gdetails';

import { CommonserviceProvider } from '../../providers/commonservice/commonservice';

/**
 * Generated class for the ManfhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manfhome',
  templateUrl: 'manfhome.html',
})
export class ManfhomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private commonseServicepvd: CommonserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManfhomePage');
  }
  dismiss() {
    this.navCtrl.push(LoginPage);
  }

  addgun() {

  }

  infogun() {

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    let alert = this.alertCtrl.create({
      title: 'Enter Gun ID',
      inputs: [
        {
          name: 'NAME',
          placeholder: 'GUN ID',
          // type: 'password'
        },
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
          text: 'Search',
          handler: data => {
            localStorage.setItem('alertdata',data.NAME);
            
            loading.present();
            this.commonseServicepvd.readany(data.NAME)
              .subscribe(response => {
                loading.dismiss();
                console.log(JSON.stringify(response["result"]["payload"]));
                if (response["returnCode"] == 'Success') {
                  localStorage.setItem('gres',response["result"]["payload"]);
                  loading.dismiss();
                  this.navCtrl.push(GdetailsPage)                  
                }
                else {
                  let alert = this.alertCtrl.create({
                    message: ' Check the credentials and retry',
                    buttons: ['Dismiss']
                  });
                  alert.present();
                  loading.dismiss();
                }

              });
          }
        }]
    });
    alert.present();
  }

}
