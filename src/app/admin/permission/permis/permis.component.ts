import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../../common-service.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-permis',
  templateUrl: './permis.component.html',
  styleUrls: ['./permis.component.css']
})
export class PermisComponent implements OnInit {
  PermissionCollection: any;

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
    this.cds.getAllPermissions(this.cds.tokenLogin).subscribe(response => {
      this.PermissionCollection = this.getTableData(response["permission"]);
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
        "module": val[i].module ? val[i].module : "",
        "description": val[i].name ? val[i].name : "",
        "add": val[i].add ? val[i].add : "",
        "edit": val[i].edit ? val[i].edit : "",
        "delete": val[i].delete ? val[i].delete : "",
        "view": val[i].view ? val[i].view : "",
        "active": val[i].isActive ? val[i].isActive : "",
        "id": val[i]._id ? val[i]._id : "",
        "deleteIndicator": "Permission"
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
