import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { HttpHeaders } from '@angular/common/http';


import { AlertController } from 'ionic-angular';

/*
  Generated class for the CommonserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Basic Y2xvdWQuYWRtaW46SFVmRnlANldBVGNo',
    'Content-Type': 'application/json'

  }),

};





@Injectable()
export class CommonserviceProvider {



  channel: any;
  chaincode: any;
  chaincodeVer: any;
  API_URL: any;
  jsondata: any;
  API_inv_URL: any;

  constructor(public http: HTTP, public https: Http, private httpclient: HttpClient, private alertCtrl: AlertController) {
    console.log('Hello CommonserviceProvider Provider');

    this.channel = 'default';
    this.chaincode = 'gun2';
    this.chaincodeVer = 'v1';
    this.API_URL = 'https://3EE9983C6B0A43969A8253630B24F1B2.blockchain.ocp.oraclecloud.com:443/restproxy1/bcsgw/rest/v1/transaction/query';
    this.API_inv_URL = 'https://3EE9983C6B0A43969A8253630B24F1B2.blockchain.ocp.oraclecloud.com:443/restproxy1/bcsgw/rest/v1/transaction/invocation'

  }



  // readdata(bdata) {
  //   console.log()
  //   let jsonBody = {
  //     "channel": this.channel,
  //     "chaincode": this.chaincode,
  //     "method": "readOrder",
  //     "args": [bdata],
  //     "chaincodeVer": this.chaincodeVer
  //   };
  //   return this.httpclient.post(this.API_URL, jsonBody, httpOptions)

  // }

  // customerResponse(b_id, res, text) {
  //   console.log('barcode :' + b_id);
  //   console.log('Response : ' + res);
  //   console.log('text input :' + text);
  //   let jsonBody = {
  //     "channel": this.channel,
  //     "chaincode": this.chaincode,
  //     "method": "CustomerIssue",
  //     "args": [b_id, res, text],
  //     "chaincodeVer": this.chaincodeVer
  //   };
  //   return this.httpclient.post(this.API_inv_URL, jsonBody, httpOptions)
  // }
  // dateformatDDMMMYYYY(d) {
  //   var date = new Date(d)
  //   var m_names = new Array("Jan", "Feb", "Mar",
  //     "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  //     "Oct", "Nov", "Dec");
  //   return date.getDate() + " " + m_names[date.getMonth()] + " " + date.getFullYear();
  // }

  //Adding Manufacturer
  addmanf(name, id) {
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "initManf",
      "args": [name, id, "Florida"],
      "chaincodeVer": this.chaincodeVer
    };
    return this.httpclient.post(this.API_inv_URL, jsonBody, httpOptions)
  }
  //Adding Dealer
  adddlr(named, did) {
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "initDealer",
      "args": [named, did, "Florida"],
      "chaincodeVer": this.chaincodeVer
    };
    return this.httpclient.post(this.API_inv_URL, jsonBody, httpOptions)
  }

  //Read Manufacturer
  readany(nam) {
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "readPersona",
      "args": [nam],
      "chaincodeVer": this.chaincodeVer
    };
    return this.httpclient.post(this.API_URL, jsonBody, httpOptions)

  }

  initgun(gunid,gpsid,gname,model,type,ownr,manf) {
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "initProduct",
      "args": [gunid,gpsid,gname,model,type,ownr,"Florida",manf],
      "chaincodeVer": this.chaincodeVer
    };
    return this.httpclient.post(this.API_URL, jsonBody, httpOptions)

  }

  getHistoryGun(gid){
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "getHistoryForProduct",
      "args": [gid],
      "chaincodeVer": this.chaincodeVer
    };
    return this.httpclient.post(this.API_URL, jsonBody, httpOptions)
  }

}
