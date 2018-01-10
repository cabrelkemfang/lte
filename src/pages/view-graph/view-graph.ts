import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Response } from '@angular/http/src/static_response';

/**
 * Generated class for the ViewGraphPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-graph',
  templateUrl: 'view-graph.html',
})
export class ViewGraphPage {
 

  public response: any;
  public Data2: any[] = [];
  public Data3: any[] = [];
  public Data4: any[] = [];
  public list:{} = {};
  public dat: any[] = [];
  
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' },
    { data: [17, 4, 7, 9, 10, 27, 70], label: 'Series d' }
  ];
  public lineChartLabels: Array<any> = [ 20, 25,50,55, 520, 875,57544]
  //["07/18/2016 00:00:00", "07/18/2016 00:00:00", "07/18/2016 00:00:00", "07/18/2016 00:00:00", "07/18/2016 00:00:00", "07/18/2016 00:00:00", "07/18/2016 00:00:00", "07/18/2016 00:00:00"]
  //['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // green
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'black',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // blue
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'blue',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // blue
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private _service: RemoteServiceProvider) {
    interface Object {
      data: any;
    }

  }

  ionViewDidLoad() {
   // this.lineChartData[0].prototype.dat = [65, 59, 80, -81, 56, 55, 0];
    console.log('ionViewDidLoad ViewGraphPage');
    console.log(typeof(this.list));
    console.log(this.list);
    this.Data4.push(this.list);
    console.log(this.lineChartData);

    //retrivind data fron the backend
    this._service.getData().subscribe(
      data => {
        this.response = data;

        //debuging purpose
        console.log(this.response);

        for (let list of this.response) {
          console.log(list);
          console.log(list.id);
          console.log(list.startTime);
          let id = list.id;
          let startTime = list.startTime;
          this.Data2.push(id);
          this.Data3.push(startTime);
          console.log(this.Data2);
          console.log(this.Data3);


        }


        // this.response.forEach(element => {
        //   console.log(element);
        //   console.log(typeof(element));
        //   console.log(element.id);
        //   let data1 = element.id;
        //   this.Data2.push(data1);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

        //   this.Data2 = element.id;
        //   //this.Data2.push(2);
        // });
      }, err => {
        //debuging purpose
        console.log(err);
      });


  }
}
