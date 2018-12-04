import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';


import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
/**
 * Generated class for the ListGunDealerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-gun-dealer',
  templateUrl: 'list-gun-dealer.html',
})
export class ListGunDealerPage {
  dealerName:any;
  guns:any;
  custName:any;
  ssn:any;
  dealName:any;
  tempGunMap = {
    guns:[]
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, private cmnsvcprd: CommonserviceProvider,private alertCtrl: AlertController) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    let credentials = JSON.parse(localStorage.getItem('credentials'));

    cmnsvcprd.listGunsWithDealer(credentials.username)
    .subscribe( response => {
      loading.dismiss();

      console.log( response );
      this.guns = JSON.parse(response["result"]["payload"])[0]["Record"];
      console.log( response );
      console.log( typeof(this.guns) );
      console.log("checking payload \n" + JSON.stringify(JSON.parse(response["result"]["payload"])));
      console.log( this.guns );

      this.guns = JSON.parse(response["result"]["payload"])
      console.log("[1]\n" + Object.keys(this.guns).length);


      var gunMap = new Array( Object.keys(this.guns).length );

      console.log("gun length " + this.guns.length);

      

      // gunMap.push([this.guns[0].Key, this.guns[0].Record.gunname]);
      // gunMap.push([this.guns[1].Key, this.guns[1].Record.gunname]);

      for( let i = 0; i < this.guns.length ; i++ )  {
        console.log("i= " + i);
        this.tempGunMap.guns.push([this.guns[i].Key, this.guns[i].Record.gunname])
      };

      console.log("gunMap\n" + typeof(gunMap))
      console.log("gunMap data\n" + (gunMap))
      console.log(this.guns[0].Key)
      console.log(this.guns[0].Record.gunname)

     
      for(let i=0; i < Object.keys(this.guns).length; i++){
        
      }
      
      
      this.guns = JSON.stringify(this.guns);
      console.log(this.tempGunMap);
      
    })
  }
  
  dismiss() {
    this.navCtrl.push(LoginPage);
  }
  transferToCustomer(gunId){
    console.log(gunId);
    let alert = this.alertCtrl.create({
      title: 'Enter SSN',
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
          text: 'Enter',
          handler: data => {
            let loadr = this.loadingCtrl.create({
              content: 'Transferring...'
            });
            this.ssn = data.ssn;
            loadr.present();
            this.cmnsvcprd.readany(data.ssn)
            .subscribe( custResponse => {
              if( custResponse["returnCode"]=="Success"){
              this.custName =  JSON.parse(custResponse["result"]["payload"])[2];
              console.log("custName\n" + this.custName);
              
              var dealer = JSON.parse(localStorage.getItem('credentials'));
              console.log("dealer\n" + dealer);
              this.dealerName = dealer["username"];

              console.log("dealer\n" + this.dealerName);
              
              this.cmnsvcprd.transferProductToCustomer(gunId, this.dealerName, this.custName, this.ssn)
    .subscribe( response => {
      

      //opening confirmation alert
      if(response["returnCode"] == "Success"){
        loadr.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Gun '+ gunId + ' has been successfully transfered to '+ this.custName,
          buttons: ['Dismiss']
        });
        alert.present();
      }
      else{
        loadr.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Failure',
          subTitle: JSON.stringify(response["info"]["peerErrors"][0]["errMsg"]),
          buttons: ['Dismiss']
        });
        alert.present();

      }
    })

    
  }
            
  else{
    let alert = this.alertCtrl.create({
      title: 'Customer not found',
      subTitle: 'Error',
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
    console.log('ionViewDidLoad ListGunDealerPage');
  }

}
