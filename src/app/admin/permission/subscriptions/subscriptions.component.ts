import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../../common-service.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { debug } from 'util';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  SubscriptionCollection: any;

  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  constructor(
    private cds: CommonServiceService,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.getDeatails();
  }

  getDeatails() {
    this.cds.getAllSubscriptions(this.cds.tokenLogin).subscribe(response => {
      this.SubscriptionCollection = this.getTableData(response["subscription"]);
    }, error => {
      var msg = error.error.message ? error.error.message : error.message
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }

  getTableData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      formatJson = {
        "name": val[i].name ? val[i].name : "",
        "code": val[i].code ? val[i].code : "",
        "duration": val[i].duration ? val[i].duration : "",
        "amount": val[i].amount ? val[i].amount : "",
        "offPricePerCane": val[i].offPricePerCane ? val[i].offPricePerCane : "",
        "maxCane": val[i].maxCane ? val[i].maxCane : "",
        "description": val[i].description ? val[i].description : "",
        "termsAndCondition": val[i].termsAndCondition ? val[i].termsAndCondition : "",
        "nextduration": val[i].nextDuration ? val[i].nextDuration : "",
        "nextamount": val[i].nextAmount ? val[i].nextAmount : "",
        "nextdescription": val[i].nextdescription ? val[i].nextdescription : "",
        "nexttermsAndCondition": val[i].nexttermsAndCondition ? val[i].nexttermsAndCondition : "",
        "nextoffPricePerCane": val[i].nextoffPricePerCane ? val[i].nextoffPricePerCane : "",
        "nextmaxCane": val[i].nextmaxCane ? val[i].nextmaxCane : "",
        "active": val[i].isActive ? val[i].isActive : "",
        "bannerImage": val[i].bannerImage ? val[i].bannerImage : "",
        "id": val[i]._id ? val[i]._id : "",
        "deleteIndicator": "Subscription"
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }

  addToast(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    this.position = options.position ? options.position : this.position;
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: options.timeout,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added removed!');
      }
    };

    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }

}
