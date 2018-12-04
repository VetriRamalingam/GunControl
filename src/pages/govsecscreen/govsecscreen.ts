import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { CommonserviceProvider } from '../../providers/commonservice/commonservice';

/**
 * Generated class for the GovsecscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-govsecscreen',
  templateUrl: 'govsecscreen.html',
})
export class GovsecscreenPage {
  tag: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private commonseServicepvd: CommonserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GovsecscreenPage');

  }

  add() {
    this.tag = localStorage.getItem('tag');
    console.log("TAG  :" + this.tag);
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    let alert = this.alertCtrl.create({
      title: 'Enter Details',
      inputs: [
        {
          name: 'ID',
          placeholder: 'ID'
        },
        {
          name: 'NAME',
          placeholder: 'Name',
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
          text: 'Submit',
          handler: data => {
            loading.present();
            if (this.tag == "manufacturer") {
              console.log("tag :" + this.tag);
              this.commonseServicepvd.addmanf(data.NAME, data.ID)
                .subscribe(response => {
                  loading.dismiss();
                  if (response["returnCode"] == 'Success') {
                    console.log('OBC res : ' + JSON.stringify(response));
                    let alert = this.alertCtrl.create({
                      title:data.NAME ,
                      message: 'is Successfully added to Oracle BlockChain ',
                      buttons: ['Dismiss']
                    });
                    alert.present();


                  }
                  else {
                    let alert = this.alertCtrl.create({
                      message: ' Manufacturer Name/ID Already Exists',
                      buttons: ['Dismiss']
                    });
                    alert.present();
                    
                  }

                })

            }
            else if (this.tag == "dealer") {
              console.log("TAG :" + this.tag);
              this.commonseServicepvd.adddlr(data.NAME, data.ID)
                .subscribe(response => {
                  loading.dismiss();
                  if (response["returnCode"] == 'Success') {
                    console.log('OBC res : ' + JSON.stringify(response));
                    let alert = this.alertCtrl.create({
                      title:data.NAME ,
                      message: 'is Successfully added to Oracle BlockChain ',
                      buttons: ['Dismiss']
                    });
                    alert.present();


                  }
                  else {
                    let alert = this.alertCtrl.create({
                      message: ' Dealer Name/ID Already Exists',
                      buttons: ['Dismiss']
                    });
                    alert.present();

                  }

                })

            }
            console.log('ID :' + data.ID + 'Name :' + data.NAME);
          }
        }
      ]
    });
    alert.present();

  }
  view() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    let alert = this.alertCtrl.create({
      title: 'Enter Name to get Info',
      inputs: [
        {
          name: 'NAME',
          placeholder: 'Name',
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
            loading.present();
            this.commonseServicepvd.readany(data.NAME)
              .subscribe(response => {
                loading.dismiss();
                console.log(JSON.stringify(response["result"]["payload"]));
                if (response["returnCode"] == 'Success') {

                  let alert = this.alertCtrl.create({
                    title: 'Name :' + ' ' + JSON.parse(response["result"]["payload"])["manfid"],
                    subTitle: 'ID :' + ' ' + JSON.parse(response["result"]["payload"])["manfname"],
                    buttons: ['Dismiss']
                  });
                  alert.present();


                }

              });
          }
        }]
    });
    alert.present();
  }
}
