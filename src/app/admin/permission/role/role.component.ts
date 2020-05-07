import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../../common-service.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  RolesCollection: any;

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
    this.cds.getAllRoles(this.cds.tokenLogin).subscribe(response => {
      this.RolesCollection = this.getTableData(response["roles"]);
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
        "description": val[i].description ? val[i].description : "",
        "id": val[i]._id ? val[i]._id : "",
        "permissionId": val[i].permissions[0]._id ? val[i].permissions[0]._id : "",
        "permissionName": val[i].permissions[0].name ? val[i].permissions[0].name : "",
        "permissionModule": val[i].permissions[0].module ? val[i].permissions[0].module : "",
        "permissionAdd": val[i].permissions[0].add ? val[i].permissions[0].add : "",
        "permissionView": val[i].permissions[0].view ? val[i].permissions[0].view : "",
        "permissionEdit": val[i].permissions[0].edit ? val[i].permissions[0].edit : "",
        "permissionDelete": val[i].permissions[0].delete ? val[i].permissions[0].delete : "",

        "active": val[i].isActive ? val[i].isActive : "",
        "deleteIndicator": "Role"
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
