import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';
import { ListGunDealerPage } from '../list-gun-dealer/list-gun-dealer';
import { LoginPage } from '../login/login';

import { CommonserviceProvider } from '../../providers/commonservice/commonservice';

/**
 * Generated class for the DealerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dealer',
  templateUrl: 'dealer.html',
})
export class DealerPage {
  ssn: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private commonsvcpvd: CommonserviceProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealerPage');
  }

  dismiss() {
    this.navCtrl.push(LoginPage);
  }

  addCustClick() {
    let alert = this.alertCtrl.create({
      title: 'Provide details',
      inputs: [
        {
          name: 'ssn',
          placeholder: 'SSN'
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
          text: 'INSERT',
          handler: data => {
            this.ssn = data.ssn

            if (/*check condition */ 2 > 8) {
              //false pop a alert
              let alert = this.alertCtrl.create({
                title: 'Can not add this customer',
                subTitle: 'blah blah',
                buttons: ['Dismiss']
              });
              alert.present();

            }
            else {
              //true....
              let alert = this.alertCtrl.create({
                title: 'Provide details',
                inputs: [
                  {
                    name: 'name',
                    placeholder: 'Name'
                  },
                  {
                    name: 'age',
                    placeholder: 'Age'
                  },
                  {
                    name: 'location',
                    placeholder: 'Location'
                  },
                  {
                    name: 'address',
                    placeholder: 'Address'
                  }
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
                    text: 'Add',
                    handler: data => {
                      let loading = this.loadingCtrl.create({
                        content: 'Adding Customer....'
                      });

                      loading.present();

                      this.commonsvcpvd.addCustomer(this.ssn, data.name, data.age, data.location, data.address)
                        .subscribe(response => {
                          if (response["returnCode"] == "Success") {
                            loading.dismiss();
                            let alert = this.alertCtrl.create({
                              title: 'Success',
                              subTitle: 'Customer ' + data.name + ' ' + 'added successfully',
                              buttons: ['Dismiss']
                            });
                            alert.present();
                          }
                          else {

                            let alert = this.alertCtrl.create({
                              title: 'Failure',
                              subTitle: 'Unsuccessful',
                              buttons: ['Dismiss']
                            });
                            alert.present();
                          }

                          console.log("resp" + JSON.stringify(response));
                        })
                    }
                  }
                ]
              });
              alert.present();



            }





          }
        }
      ]
    });
    alert.present();






  }

  viewCusClick(){

  }

  transCustClick() {
    this.navCtrl.push(ListGunDealerPage);
  }

}
