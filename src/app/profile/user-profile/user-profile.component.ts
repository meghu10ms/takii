import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../../common-service.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isBusy = false;
  viewProfile: FormGroup;
  userDetails: any;
  isProfileView = false;

  isDeletePermission: any;
  isEditPermission: any;

  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private toastyService: ToastyService,
    private cds: CommonServiceService,
    private cnfr: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.isDeletePermission = this.cds.canDelete;
    this.isEditPermission = this.cds.canEdit;
    if (this.cds.viewProfileId) {
      this.getDetails(this.cds.viewProfileId);
    } else {
      this.isProfileView = true;
      this.getDetails(this.cds.currentUserDetail._id);
    }
  }

  getDetails(id) {
    this.isBusy = true;
    this.cds.getSingleUserDetails(id, this.cds.tokenLogin).subscribe(response => {
      this.isBusy = false;
      var x = JSON.stringify(response)
      this.userDetails = this.getTableData(JSON.parse(x));
      //this.bindDisplayValues(x);
    }, error => {
      this.isBusy = false;
      this.addToast({ title: 'Error', msg: error['error'].message, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }

  getTableData(val) {
    var selJson = {};
    selJson = {
      "title": val.name ? val.name.title : "",
      "firstName": val.name ? val.name.firstName : "",
      "lastName": val.name ? val.name.lastName : "",
      "phone": val.phoneNumber ? val.phoneNumber : "",
      "email": val.email ? val.email : "",
      "profilePicture": val.profilePicture ? val.profilePicture : "assets/images/user.png",
      "areaId": val.area[0] ? val.area[0]._id : "",
      "areaCode": val.area[0] ? val.area[0].areaCode : "",
      "areaName": val.area[0] ? val.area[0].name : "",
      "areaAddress": val.area[0] ? val.area[0].formattedAddress : "",
      "roleId": val.role ? val.role._id : "",
      "roleName": val.role ? val.role.name : "",
      "roleDescription": val.role ? val.role.description : "",
      "supervisorId": val.supervisor ? val.supervisor._id : "",
      "superviserEmail": val.supervisor ? val.supervisor.email : "",
      "superviserName": val.supervisor ? val.supervisor.name.firstName : "",
      "areaAdminId": val.areaAdmin ? val.areaAdmin._id : "",
      "areaAdminEmail": val.areaAdmin ? val.areaAdmin.email : "",
      "areaAdminName": val.areaAdmin ? val.areaAdmin.name.firstName : "",
      "isActive": val.isActive ? val.isActive : "",
      "isSuperAdmin": val.isSuperAdmin ? val.isSuperAdmin : "",
      "id": val._id ? val._id : ""
    }

    return selJson;
  }
  onPressEditUser(val) {
    this.cds.editUserDetails = val;
    this.router.navigate(['/user/add-user']);
  }

  onPressDeleteUser(val) {
    this.cnfr.confirm('Please confirm..', 'Do you really want to ... ?')
      .then((confirmed) => {
        if (confirmed) {
          this.isBusy = true;
          this.cds.deleteUser(val.id, this.cds.tokenLogin).subscribe(response => {
            this.isBusy = false;
            this.addToast({ title: 'Info', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
            this.router.navigate(['/user/user-list']);
          }, error => {
            this.isBusy = false;
            var msg = error.error.message ? error.error.message : error.message;
            this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
          })
        }
      })
      .catch(() => {
      });
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

  ngOnDestroy() {
    this.cds.viewProfileId = undefined;
  }

}
