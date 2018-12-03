import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import {CommonserviceProvider} from '../../providers/commonservice/commonservice';

/**
 * Generated class for the GdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gdetails',
  templateUrl: 'gdetails.html',
})
export class GdetailsPage {
  rdata: any;
  gid:any;
  gpsid:any;
  gname:any;
  constructor(public navCtrl: NavController,private loadingCtrl: LoadingController, private alertCtrl: AlertController, public navParams: NavParams, private commonseServicepvd :CommonserviceProvider) {
    
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad GdetailsPage');
    this.rdata=JSON.parse(localStorage.getItem('gres'));
    console.log('rdata' + this.rdata['gunid'])
    // this.rdata = JSON.parse(this.rdata);
    this.gid =this.rdata['gunid'];
   
  }



}
