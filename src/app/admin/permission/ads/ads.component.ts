import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  public AdsCollection:any;
  constructor() { }

  ngOnInit() {
    this.AdsCollection = [{
      "p1":"35%",
      "p2":"Ads1"
    },{
      "p1":"35%",
      "p2":"Ads2"
    },{
      "p1":"35%",
      "p2":"Ads3"
    },{
      "p1":"35%",
      "p2":"Ads4"
    },{
      "p1":"35%",
      "p2":"Ads5"
    },{
      "p1":"35%",
      "p2":"Ads6"
    },{
      "p1":"35%",
      "p2":"Ads7"
    },{
      "p1":"35%",
      "p2":"Ads8"
    },{
      "p1":"35%",
      "p2":"Ads9"
    },{
      "p1":"35%",
      "p2":"Ads10"
    },{
      "p1":"35%",
      "p2":"Ads11"
    }];
  }
  
}
