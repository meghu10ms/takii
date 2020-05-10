import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../../common-service.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  isBusy = false;
  AreaCollection: any;

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
    this.isBusy = true;
    this.cds.getAllAraeDetails(this.cds.tokenLogin).subscribe(response => {
      this.isBusy = false;
      this.AreaCollection = this.getTableData(response["areas"]);
    }, error => {
      this.isBusy = false;
      var msg = error.error.message ? error.error.message : error.message
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }

  getTableData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      formatJson = {
        "code": val[i].areaCode ? val[i].areaCode : "",
        "area": val[i].formattedAddress ? val[i].formattedAddress : "",
        "name": val[i].name ? val[i].name : "",
        "lt": val[i].latitude ? val[i].latitude : "",
        "lg": val[i].longitude ? val[i].longitude : "",
        "id": val[i]._id ? val[i]._id : "",
        "deleteIndicator": "Area"
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
