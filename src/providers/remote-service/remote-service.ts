//import { HttpClient } from '@angular/common/http';
import { Headers, Http, RequestOptions } from '@angular/http';
import { NavController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import * as base64 from "base-64";

/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {
  loading: any;
  url: string = "http://192.168.43.123:8080/";
  username: string;
  public token: String;
  value: any[] = [];

  constructor(
    public http: Http,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {

  }

  //login request
  getLogin(username): Observable<any[]> {

    //retrieve the token store in the browser
    this.storage.get('token').then((val) => {
      this.token = val;
      this.value.push(this.token);

      //debuging purpose
      console.log("this is the modificatin " + this.token);

    });

    let timeoutMS = 100000;

    //generate a token
    //var token = require('basic-auth-token');
    //let tokens = token(this.info[0], this.info[1]);
    console.log("this is the modificatin " + this.value);
    this.value.length = 0
  

    let token1 = 'a2F5OnBsZWFzZQ =='
    console.log("the token is :" + token1);

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + token1);

    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + username, options)
      .timeout(timeoutMS)
      .map(res => res.json());
  }

  // request to get all the files in the backend
  getFiles(username, id): Observable<any[]> {
    let timeoutMS = 100000;
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + username + "/" + id, options)
      .timeout(timeoutMS)
      .map(res => res.json());
  }

  //request to get data fron the backend
  getData(): Observable<any[]> {
    let timeoutMS = 100000;
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://localhost:8080/test2.json", options)
      .timeout(timeoutMS)
      .map(res => res.json());
  }


  // sign request 
  signUpRequest(postParams) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.url + "register", JSON.stringify(postParams), options)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
  }

  // // update request
  updateUser(params, username, id) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + username + '/' + id, params, options)
      .subscribe(success => {
        console.log(success['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
  }


  // file request
  postFile(postParams) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.http.post("http://jsonplaceholder.typicode.com/posts", postParams, options)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);// Error getting the data
      });
  }

  //logout request
  logout() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('X-Auth-Token', localStorage.getItem('token'));
      this.http.post(this.url, {}, { headers: headers })
        .subscribe(res => {
          localStorage.clear();
        }, (err) => {
          reject(err);
        });
    });
  }

  // login request
  login(params) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.url + "login", JSON.stringify(params), options)
      .subscribe(data => {
        console.log(data['_body'])
      }, error => {
        console.log(error);// Error getting the data
      });
  }


  //testing purpose 
  getAllArticles(): Observable<any[]> {
    return this.http.get("http://localhost:8080/test.json")
      .map(res => res.json());

  }

  //request for deleting aacount
  deleteUser(): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    //let cpParams = new URLSearchParams();
    // cpParams.set('id', articleId);
    let options = new RequestOptions({ headers: cpHeaders, });
    return this.http.delete(this.url, options)
      .map(success => success.status)

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
}
