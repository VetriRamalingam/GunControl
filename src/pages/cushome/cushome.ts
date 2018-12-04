import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HistoryPage } from '../history/history';

import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
/**
 * Generated class for the CushomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cushome',
  templateUrl: 'cushome.html',
})
export class CushomePage {
  cusname: any;
  gunid: any;
  cusid:any;
  cusage:any;
  cusloc:any;
  cusadr:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController,public loadingCtrl: LoadingController, private cmnsvcpvd: CommonserviceProvider) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    var ssn = JSON.parse(localStorage.getItem('credentials'));
    ssn = ssn.username;
    console.log("ssn\n" + ssn)
    cmnsvcpvd.readany(ssn)
      .subscribe(response => {


        console.log("response for ReadPersona\n" + JSON.stringify(response));
        this.cusname = JSON.parse(response["result"]["payload"])[2];
        this.cusid = JSON.parse(response["result"]["payload"])[1];
        this.cusage=JSON.parse(response["result"]["payload"])[3];
        this.cusloc=JSON.parse(response["result"]["payload"])[4];
        this.cusadr=JSON.parse(response["result"]["payload"])[5];

        console.log("custName\n" + this.cusname);


        cmnsvcpvd.readGunWithCustomer(this.cusname)
          .subscribe(guns => {
            loading.dismiss();
            if (JSON.parse(guns["result"]["payload"]) != null) {
              console.log("guns with customer\n" + JSON.stringify(guns));
              console.log("guns JSON");
              this.gunid = JSON.parse(guns["result"]["payload"])[0].Key;
              console.log("gunid" + this.gunid);

              cmnsvcpvd.getHistoryGun(this.gunid)
                .subscribe(history => {

                  console.log("history response")
                  console.log(JSON.parse(history["result"]["payload"]));
                  localStorage.setItem('history', (history["result"]["payload"]));
                })
            }
            else{
              let alert=alertCtrl.create({
                title:'No Data to Display',
                buttons:[{
                  text:'Dismiss',
                  handler:data=>{
                    this.dismiss();
                  }
                }]
              });
            }

          })



      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CushomePage');
  }
  dismiss() {
    this.navCtrl.push(LoginPage);
  }
  historypage() {
    this.navCtrl.push(HistoryPage);
  }


}
