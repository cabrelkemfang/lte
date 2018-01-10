import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { UserPage } from '../user/user';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Storage } from '@ionic/storage';
import * as base64 from "base-64";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: any;
  data: any;
  value: any[];
  responseData: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private _service: RemoteServiceProvider,
    private storage: Storage
  ) {

    this._service = _service;

  }

  signUp() {
    //redirect to the sign up page
    this.navCtrl.push(SignUpPage);
  }

  onSubmit(login) {

    console.log(JSON.stringify(login.value));

    let username = login.value.username;
    let password = login.value.password;

    //generation of the token
    var token = base64.encode(username + ':' + password);


    //send post to a backend
    //this._service.login(login.value);

    //store user name  and password  in the browser
    this.storage.set('username', username);
    this.storage.set('password', password);
    this.storage.set('token', token);
    this.navCtrl.setRoot(UserPage);
    //respond of the backend
    this.showLoader();
    this._service.getLogin(username).subscribe(data => {
      this.loading.dismiss();
      this.responseData = data;
      //debrging purpose
      console.log(this.responseData);

      
     // check if the the user have 
      if (login.value.username === "kay") {

        // go to user page
        this.navCtrl.setRoot(UserPage);
      } else {
        this.presentToast("The username or Password are not correct");
      }

    },
      err => {
        this.loading.dismiss();
        this.presentToast("No internet connection");
      });
  }

  /* Submit(login) {
      this.showLoader();
     // this._service.login(login).then((result) => {
        this.loading.dismiss();
        this.data = result;
        localStorage.setItem('token', this.data.access_token);
        this.navCtrl.setRoot(UserPage);
      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      });
    }
   */

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
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
