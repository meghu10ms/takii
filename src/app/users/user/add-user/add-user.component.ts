import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../common-service.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  isBusy = false;
  newUserForm: FormGroup;
  imgURL: any;
  isOldEntry = false;

  isSuperAdminPermission: any;

  areaCollection = [];
  roleCollection = [];
  userCollection = [];

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
    private cds: CommonServiceService
  ) { }

  ngOnInit() {
    this.isSuperAdminPermission = this.cds.currentUserDetail.isSuperAdmin ? this.cds.currentUserDetail.isSuperAdmin : false;
    this.imgURL = "assets/images/user.png"
    this.createNewUserForm();
    this.getEssenetialData();
    if (this.cds.editUserDetails) {
      this.isOldEntry = true;
      this.bindDisplayValues(this.cds.editUserDetails);
    }
  }
  createNewUserForm() {
    this.newUserForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['+91', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: [''],
      profilePicture: [''],
      areaId: ['', Validators.required],

      roleId: ['', Validators.required],
      superviserId: ['', Validators.required],
      areaAdminId: ['', Validators.required],
      isActive: [''],
      isSuperAdmin: [''],
      id: [''],
    })
  }
  getEssenetialData() {
    this.isBusy = true;
    this.cds.getAllAraeDetails(this.cds.tokenLogin).subscribe(response => {
      this.isBusy = false;
      this.areaCollection = this.getAreaTableData(response["areas"]);
    }, error => {
      this.isBusy = false;
      var msg = error.error.message ? error.error.message : error.message
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })

    this.isBusy = true;
    this.cds.getAllRoles(this.cds.tokenLogin).subscribe(response => {
      this.isBusy = false;
      this.roleCollection = this.getRoleTableData(response["roles"]);
    }, error => {
      this.isBusy = false;
      var msg = error.error.message ? error.error.message : error.message
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })

    this.isBusy = true;
    this.cds.getAllUser(this.cds.tokenLogin).subscribe(response => {
      this.isBusy = false;
      this.userCollection = this.getTableData(response["users"]);
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
      var title = val[i].name ? val[i].name.title : ""
      var name = val[i].name ? val[i].name.firstName : ""
      var lname = val[i].name ? val[i].name.lastName : ""
      formatJson = {
        "name": title + " " + name + " " + (lname ? lname : ""),
        "email": val[i].email ? val[i].email : "",
        "phone": val[i].phoneNumber ? val[i].phoneNumber : "",
        "active": val[i].isActive ? val[i].isActive : "",
        "fcmToken": val[i].fcmToken ? val[i].fcmToken : "",
        "area": val[i].area[0] ? val[i].area[0].areaCode : "",
        "role": val[i].role ? val[i].role["name"] : "",
        "areaAdminId": val[i]._id ? val[i]._id : "",
        "superviserId": val[i]._id ? val[i]._id : ""
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }
  getAreaTableData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      formatJson = {
        "areaCode": val[i].areaCode ? val[i].areaCode : "",
        "areaAddress": val[i].formattedAddress ? val[i].formattedAddress : "",
        "areaName": val[i].name ? val[i].name : "",
        "areaId": val[i]._id ? val[i]._id : ""
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }
  getRoleTableData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      formatJson = {
        "roleName": val[i].name ? val[i].name : "",
        "roleDescription": val[i].description ? val[i].description : "",
        "roleId": val[i]._id ? val[i]._id : ""
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.addToast({ title: 'Error', msg: "File Type Not supporting upload imgage only", timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      return;
    }
    if (files[0].size > 2000000) {
      this.addToast({ title: 'Error', msg: "File size excceds 2MB", timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('name', 'profile_pictre');
    this.cds.postMedia(formData).subscribe(response => {
      this.imgURL = response["media"].url;
    }, error => {
      this.addToast({ title: 'Error', msg: (error.error.error ? error.error.error.message : error.error.message), timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
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
  areaChange(event) {
  }
  onClickSaveUser() {
    if (this.newUserForm.valid && this.imgURL) {
      var selectedValue = this.newUserForm.value;
      var basicInfo = [], areaInfo = [], roleInfo = [], areaAdminInfo = [], supervisorInfo = [];
      var basicJson = {
        "title": selectedValue.title,
        "firstName": selectedValue.firstName,
        "lastName": selectedValue.lastName
      }
      areaInfo.push(selectedValue.areaId);
      // roleInfo.push(selectedValue.roleId);
      // areaAdminInfo.push(selectedValue.areaAdminid);
      // supervisorInfo.push(selectedValue.superviserId);
      var bodyData = {
        "name": basicJson,
        "phoneNumber": selectedValue.phone,
        "email": selectedValue.email,
        "password": selectedValue.password,
        "isActive": selectedValue.isActive ? selectedValue.isActive : false,
        "isSuperAdmin": selectedValue.isSuperAdmin ? selectedValue.isSuperAdmin : false,
        "profilePicture": this.imgURL,
        "area": areaInfo,
        "role": selectedValue.roleId,
        "supervisor": selectedValue.superviserId,
        "areaAdmin": selectedValue.areaAdminid
      }

      this.isBusy = true;
      this.cds.postUserDetails(bodyData, this.cds.tokenLogin).subscribe(response => {
        this.isBusy = false;
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
        this.router.navigate(['/user/user-list']);
      }, error => {
        this.isBusy = false;
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newUserForm.controls) {
        if (this.newUserForm.controls[name].validator && this.newUserForm.controls[name].value == '' || this.newUserForm.controls[name].value == null) {
          this.newUserForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: (name + " is Invalid"), timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newUserForm.controls[name].setErrors(null);
      }
    }
  }

  onClickUpdateUser() {
    if (this.newUserForm.valid && this.imgURL) {
      var selectedValue = this.newUserForm.value;
      var basicInfo = [], areaInfo = [], roleInfo = [], areaAdminInfo = [], supervisorInfo = [];
      var basicJson = {
        "title": selectedValue.title,
        "firstName": selectedValue.firstName,
        "lastName": selectedValue.lastName
      }
      areaInfo.push(selectedValue.areaId);
      // roleInfo.push(selectedValue.roleId);
      // areaAdminInfo.push(selectedValue.areaAdminid);
      // supervisorInfo.push(selectedValue.superviserId);
      var bodyData = {
        "name": basicJson,
        "phoneNumber": selectedValue.phone,
        "email": selectedValue.email,
        //"password": selectedValue.password,
        "isActive": selectedValue.isActive ? selectedValue.isActive : false,
        "isSuperAdmin": selectedValue.isSuperAdmin ? selectedValue.isSuperAdmin : false,
        "profilePicture": this.imgURL,
        "area": areaInfo,
        "role": selectedValue.roleId,
        "supervisor": selectedValue.superviserId,
        "areaAdmin": selectedValue.areaAdminid
      }
      this.isBusy = true;
      this.cds.updateUserDetails(selectedValue.id, bodyData, this.cds.tokenLogin).subscribe(response => {
        this.isBusy = false;
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
      }, error => {
        this.isBusy = false;
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newUserForm.controls) {
        if (this.newUserForm.controls[name].validator && this.newUserForm.controls[name].value == '' || this.newUserForm.controls[name].value == null) {
          this.newUserForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: (name + " is Invalid"), timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newUserForm.controls[name].setErrors(null);
      }
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 43)
      return true;
    else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else
      return true;
  }

  bindDisplayValues(val) {
    this.imgURL = val.profilePicture;
    this.newUserForm.patchValue({
      title: val.title,
      firstName: val.firstName,
      lastName: val.lastName,
      phone: val.phone,
      email: val.email,
      areaId: val.areaId,
      roleId: val.roleId,
      superviserId: val.supervisorId,
      areaAdminId: val.areaAdminId,
      isActive: val.isActive ? val.isActive : false,
      isSuperAdmin: val.isSuperAdmin ? val.isSuperAdmin : false,
      id: val.id
    })
  }

  ngOnDestroy() {
    this.cds.editUserDetails = undefined;
  }
}