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
    'Authorization': 'Basic RGVlcGFsaS5zYXJhc3dhdEBvcmFjbGUuY29tOkJhbmdhbG9yZUAxMjM0',
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
    this.chaincode = 'chain21';
    this.chaincodeVer = 'v1';
    this.API_URL = 'https://BA79E21CBFB44C87B4736086F7B36109.blockchain.ocp.oraclecloud.com:443/restproxy1/bcsgw/rest/v1/transaction/query';
    this.API_inv_URL = 'https://BA79E21CBFB44C87B4736086F7B36109.blockchain.ocp.oraclecloud.com:443/restproxy1/bcsgw/rest/v1/transaction/invocation '

  }



  readdata(bdata) {
    console.log()
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "readOrder",
      "args": [bdata],
      "chaincodeVer": this.chaincodeVer
    };
    return this.httpclient.post(this.API_URL, jsonBody, httpOptions)

  }

  customerResponse(b_id, res, text) {
    console.log('barcode :' + b_id);
    console.log('Response : ' + res);
    console.log('text input :' + text);
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "CustomerIssue",
      "args": [b_id, res, text],
      "chaincodeVer": this.chaincodeVer
    };
    return this.httpclient.post(this.API_inv_URL, jsonBody, httpOptions)
  }
  dateformatDDMMMYYYY(d) {
    var date = new Date(d)
    var m_names = new Array("Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec");
    return date.getDate() + " " + m_names[date.getMonth()] + " " + date.getFullYear();
  }


}
