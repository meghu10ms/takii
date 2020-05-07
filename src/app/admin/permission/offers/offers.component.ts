import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  OfferCollection:any;
  constructor() { }

  ngOnInit() {
    this.OfferCollection = [{
      "p1":"35%",
      "p2":"Offer1"
    },{
      "p1":"35%",
      "p2":"Offer2"
    },{
      "p1":"35%",
      "p2":"Offer3"
    },{
      "p1":"35%",
      "p2":"Offer4"
    },{
      "p1":"35%",
      "p2":"Offer5"
    },{
      "p1":"35%",
      "p2":"Offer6"
    },{
      "p1":"35%",
      "p2":"Offer7"
    },{
      "p1":"35%",
      "p2":"Offer8"
    },{
      "p1":"35%",
      "p2":"Offer9"
    },{
      "p1":"35%",
      "p2":"Offer10"
    },{
      "p1":"35%",
      "p2":"Offer11"
    }];
  }

}
