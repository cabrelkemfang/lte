import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UploardFilePage } from '../pages/uploard-file/uploard-file';
import { EditPersonalInformationPage } from '../pages/edit-personal-information/edit-personal-information';
import { UserPage } from '../pages/user/user';
import { Storage } from '@ionic/storage';

// import { ViewGraphPage } from '../pages/view-graph/view-graph';
import { AlertController } from 'ionic-angular';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { ToastController } from 'ionic-angular';
import * as base64 from "base-64";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  // ViewGraphPage;

  pages: Array<{ title: string, component: any }>;
  token: string;


  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private alertCtrl: AlertController,
    private _service: RemoteServiceProvider,
    private toastCtrl: ToastController
  ) {


    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: UserPage },
      { title: 'Edit personal information', component: EditPersonalInformationPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.storage.remove('username');
    this.storage.remove('token');
    this.nav.setRoot(HomePage);
  }

  delete() {
    let alert = this.alertCtrl.create({
      title: 'Delete the Account',
      message: 'Are you sure you want to Delete you account??',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //deburging purpose

            console.log('Cancel clicked');


          }
        },
        {
          text: 'Delete',
          handler: () => {
            //deburging purpose
            console.log('Delete clicked');

            //deleting the aacount
            let alert = this.alertCtrl.create({
              title: 'Crudential',
              inputs: [
                {
                  name: 'username',
                  placeholder: 'Username'
                },
                {
                  name: 'password',
                  placeholder: 'Password',
                  type: 'password'
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
                  text: 'Ok',
                  handler: data => {
                    // send a response 
                    //retrieve the token store in the browser
                    this.storage.get('token').then((val) => {
                      this.token = val;
                      //this.value.push(this.token);

                      //debuging purpose
                      console.log("this is the modificatin " + this.token);

                    });
                    //generation of the token
                    var verificationtoken = base64.encode(data.username + ':' + data.password);
                    
                    if (verificationtoken==this.token) {
                      console.log("ok");
                      this._service.deleteUser();

                      //redirect to home page
                      this.storage.remove('token');
                      this.nav.setRoot(HomePage);


                      let toast = this.toastCtrl.create({
                        message: 'Account deleted',
                        duration: 4000,
                        position: 'top'
                      });

                      toast.onDidDismiss(() => {
                        console.log('Dismissed toast');
                      });

                      toast.present();
                    } else {
                      let toast = this.toastCtrl.create({
                        message: 'The user name or the password are not correct',
                        duration: 4000,
                        position: 'top'
                      });

                      toast.onDidDismiss(() => {
                        console.log('Dismissed toast');
                      });

                      toast.present();

                    }
                  }
                }
              ]
            });
            alert.present();

          }
        }

      ]
    });
    alert.present();
  }


}



