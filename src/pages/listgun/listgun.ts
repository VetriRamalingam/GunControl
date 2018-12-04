import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';

import { CommonserviceProvider } from '../../providers/commonservice/commonservice';

import { LoginPage } from '../login/login';
/**
 * Generated class for the ListgunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listgun',
  templateUrl: 'listgun.html',
})
export class ListgunPage {
  dealerName: any;
  guns: any;
  custName: any;
  ssn: any;
  tempGunMap = {
    guns: []
  }
  credentials: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl:LoadingController, private alertCtrl: AlertController, private cmnsvcprd: CommonserviceProvider) {
    this.credentials = JSON.parse(localStorage.getItem('credentials'));
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    cmnsvcprd.listGunsWithmanufacturer(this.credentials.username)
      .subscribe(response => {
        loading.dismiss();
        console.log(response);
        this.guns = JSON.parse(response['result']['payload'])[0]['Record'];
        console.log(typeof (this.guns));
        console.log("checking payload \n" + JSON.stringify(JSON.parse(response['result']['payload'])));
        console.log(this.guns);

        this.guns = JSON.parse(response['result']['payload'])
        console.log("[1]\n" + Object.keys(this.guns).length);


        var gunMap = new Array(Object.keys(this.guns).length);

        console.log("gun length " + this.guns.length);



        gunMap.push([this.guns[0].Key, this.guns[0].Record.gunname]);
        // gunMap.push([this.guns[1].Key, this.guns[1].Record.gunname]);

        for (let i = 0; i < this.guns.length; i++) {
          console.log("i= " + i);
          this.tempGunMap.guns.push([this.guns[i].Key, this.guns[i].Record.gunname])
        };

        console.log("gunMap\n" + typeof (gunMap))
        console.log("gunMap data\n" + (gunMap))
        console.log(this.guns[0].Key)
        console.log(this.guns[0].Record.gunname)

        // console.log(this.guns[1].Key)
        for (let i = 0; i < Object.keys(this.guns).length; i++) {

        }


        this.guns = JSON.stringify(this.guns);
        console.log(this.tempGunMap);

      })


  }
  dismiss() {
    this.navCtrl.push(LoginPage);
  }
  transferToCustomer(gunId) {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    console.log(gunId);
    let alert = this.alertCtrl.create({
      title: 'Enter Dealer Name',
      inputs: [
        {
          name: 'ssn',
          placeholder: 'Name'
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
          text: 'Enter',
          handler: data => {
            this.ssn = data.ssn;
            loading.present();
            this.cmnsvcprd.transferGun(gunId, this.credentials.username, data.ssn, data.ssn)
              .subscribe(Response => {
                loading.dismiss();
                console.log("goutham response");
                console.log(Response);
                this.custName = JSON.parse(Response['result']['payload'])['dealername'];
                console.log("custName\n" + this.custName);
                if (Response['returnCode'] == "Success") {

                  console.log("response for success" + Response['returnCode']);
                  let alert = this.alertCtrl.create({
                    title: 'Gun ID :' + ' ' + JSON.parse(Response['result']['payload'])['gunid'],
                    subTitle: 'is Successfully moved to'+ ' '+ JSON.parse(Response['result']['payload'])['dealername'],
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
        }
      ]
    });
    alert.present();




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListgunPage');
  }

}
