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

  initgun(gunid, gpsid, gname, model, type, ownr, loc, manf) {
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "initProduct",
      "args": [gunid, gpsid, gname, model, type, ownr, loc, manf],
      "chaincodeVer": this.chaincodeVer
    };
    return this.httpclient.post(this.API_inv_URL, jsonBody, httpOptions)

  }

  getHistoryGun(gid) {
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "getHistoryForProduct",
      "args": [gid],
      "chaincodeVer": this.chaincodeVer
    };
    return this.httpclient.post(this.API_URL, jsonBody, httpOptions)
  }

  transferGun(gunid, manuf, conr, nonr) {
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "transferProduct",
      "args": [gunid, manuf, conr, nonr],
      "chaincodeVer": this.chaincodeVer
    };
    return this.httpclient.post(this.API_inv_URL, jsonBody, httpOptions)

  }
  listGunsWithmanufacturer(manufacturerName) {
    console.log("manu name\n" + manufacturerName);
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "queryProduct",
      "args": ["{\"selector\":{\"Gun\":\"gun\",\"manf\":\"" + manufacturerName + "\"}}"],
      "chaincodeVer": this.chaincodeVer
    };
    console.log("JSOn  :" + jsonBody)
    return this.httpclient.post(this.API_URL, jsonBody, httpOptions)
  }
  readGunWithCustomer(custname) {
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "queryProduct",
      "args": ["{\"selector\":{\"Gun\":\"gun\",\"owner\":\"" + custname + "\"}}"],
      "chaincodeVer": this.chaincodeVer
    };
    return this.httpclient.post(this.API_URL, jsonBody, httpOptions);
  }
  transferProductToCustomer(gunId, delaerName, custName, custSsn) {
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "transferProductToCustomer",
      "args": [gunId, delaerName, custName, custSsn],
      "chaincodeVer": this.chaincodeVer
    };

    return this.httpclient.post(this.API_inv_URL, jsonBody, httpOptions);
  }
  addCustomer(ssn, name, age, location, address) {
    console.log(ssn, name, age, location, address);
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "initCustomer",
      "args": [ssn, name, age, location, address],
      "chaincodeVer": this.chaincodeVer
    };

    console.log(jsonBody);
    console.log(this.httpclient.post(this.API_inv_URL, jsonBody, httpOptions))
    return this.httpclient.post(this.API_inv_URL, jsonBody, httpOptions);
  }
  listGunsWithDealer(dealerName) {
    console.log(dealerName);
    let jsonBody = {
      "channel": this.channel,
      "chaincode": this.chaincode,
      "method": "queryProduct",
      "args": ["{\"selector\":{\"Gun\":\"gun\",\"dealername\":\"" + dealerName + "\"}}"],
      "chaincodeVer": this.chaincodeVer
    };
    console.log(jsonBody);
    return this.httpclient.post(this.API_URL, jsonBody, httpOptions)
  }


}
