import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GdetailsPage } from '../gdetails/gdetails';
import { ListgunPage } from '../listgun/listgun';

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
  jsonOfBarcode: any;
  jBarcode: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner, private alertCtrl: AlertController, private commonseServicepvd: CommonserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManfhomePage');
  }
  dismiss() {
    this.navCtrl.push(LoginPage);
  }
  scan() {

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.barcodeScanner.scan().then(barcodeData => {
      this.jsonOfBarcode = JSON.parse(barcodeData.text);
      localStorage.setItem('barc', JSON.stringify(this.jsonOfBarcode))
      loading.present();
      this.commonseServicepvd.readany(this.jsonOfBarcode.GunID)
        .subscribe(response => {
          loading.dismiss();
          if (response['returnCode'] == "Success") {
            localStorage.setItem('gres', response["result"]["payload"]);
            console.log("response from scan");
            let alert = this.alertCtrl.create({
              title: 'Gun ID :' + ' ' + this.jsonOfBarcode.GunID,
              subTitle: 'Already exists. Would you like to know more?',
              buttons: [

                'Cancel',
                {
                  text: 'Yes',
                  handler: () => {
                    console.log('Buy clicked');
                    this.navCtrl.push(GdetailsPage);

                  }
                }]
            });
            alert.present();
          }
          else {
            console.log('pusing to addgun')
            this.addgun();
          }

        });
    }).catch(err => {
      console.log('Error', err);
    });
  }
  addgun() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    let loadr = this.loadingCtrl.create({
      content: 'Adding to OBC...'
    });
    loadr.present();
    this.jBarcode = JSON.parse(localStorage.getItem('barc'));
    this.commonseServicepvd.initgun(this.jsonOfBarcode.GunID, this.jsonOfBarcode.GpsID, this.jsonOfBarcode.GunName, this.jsonOfBarcode.Model, this.jsonOfBarcode.Type, this.jsonOfBarcode.Owner, this.jsonOfBarcode.Location, this.jsonOfBarcode.Manufacturer)
      .subscribe(response => {
        loadr.dismiss();
        if (response['returnCode'] == "Success") {

          console.log("response for success" + response['returnCode']);
          let alert = this.alertCtrl.create({
            title: 'Gun ID :' + ' ' + this.jsonOfBarcode.GunID,
            subTitle: 'is Successfully added to Oracle BlockChain',
            buttons: ['Dismiss']
          });
          alert.present();
        }
        else {
          let alert = this.alertCtrl.create({
            title: ' Check the credentials and retry',
            buttons: ['Dismiss']
          });
          alert.present();
        }

      });


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
            localStorage.setItem('alertdata', data.NAME);

            loading.present();
            this.commonseServicepvd.readany(data.NAME)
              .subscribe(response => {
                loading.dismiss();
                // console.log(JSON.stringify(response["result"]["payload"]));
                if (response["returnCode"] == 'Success') {
                  localStorage.setItem('gres', response["result"]["payload"]);
                  this.navCtrl.push(GdetailsPage)
                }
                else {
                  let alert = this.alertCtrl.create({
                    message: ' Check the credentials and retry',
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
  transfergun() {
    this.navCtrl.push(ListgunPage);


    //   let loading = this.loadingCtrl.create({
    //     content: 'Loading...'
    //   });

    //   let alert = this.alertCtrl.create({
    //     title: 'Enter Gun ID',
    //     inputs: [
    //       {
    //         name: 'NAME',
    //         placeholder: 'GUN ID',
    //         // type: 'password'
    //       },
    //       {
    //         name: 'Deal',
    //         placeholder: 'Dealer Name',
    //         // type: 'password'
    //       }
    //     ],
    //     buttons: [
    //       {
    //         text: 'Cancel',
    //         role: 'cancel',
    //         handler: data => {
    //           console.log('Cancel clicked');
    //         }
    //       },
    //       {
    //         text: 'SUbmit',
    //         handler: data => {
    //           localStorage.setItem('alertdata', data.NAME);

    //           loading.present();
    //           this.commonseServicepvd.readany(data.NAME)
    //             .subscribe(response => {
    //               loading.dismiss();
    //               // console.log(JSON.stringify(response["result"]["payload"]));
    //               if (response["returnCode"] == 'Success') {
    //                 localStorage.setItem('gres', response["result"]["payload"]);
    //                 this.navCtrl.push(GdetailsPage)
    //               }
    //               else {
    //                 let alert = this.alertCtrl.create({
    //                   message: ' Check the credentials and retry',
    //                   buttons: ['Dismiss']
    //                 });
    //                 alert.present();

    //               }

    //             });
    //         }
    //       }]
    //   });
    //   alert.present();
  }
}
