import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../common-service.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css']
})
export class NewRoleComponent implements OnInit {
  newRoleForm: FormGroup;
  formTitle = "Add New Role";
  editInd = false;
  codeErrorInd = false;
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
    private router: Router,
    private toastyService: ToastyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getPermissionDetail();
    this.createForm();
    if (this.cds.roleIdEdit) {
      this.editInd = true;
      this.formTitle = "Update Selected Area"
      this.getRoleDetails(this.cds.roleIdEdit);
    }
  }

  createForm() {
    this.newRoleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      permissions: ['', Validators.required],
      active: [''],
      id: ['']
    })
  }

  getRoleDetails(id) {
    this.cds.getSingleRole(id, this.cds.tokenLogin).subscribe(response => {
      var x = this.getTableData(response);
      this.bindDisplayValues(x);
    }, error => {
      var msg = error.error.message ? error.error.message : error.message
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }

  getTableData(val) {
    var formatJson = {};
    formatJson = {
      "name": val.name ? val.name : "",
      "description": val.description ? val.description : "",
      "permissions": val.permissions[0]._id ? val.permissions[0]._id : "",
      "active": val.isActive ? val.isActive : "",
      "id": val._id ? val._id : ""
    }
    return formatJson;
  }

  getPermissionDetail() {
    this.cds.getAllPermissions(this.cds.tokenLogin).subscribe(response => {
      this.PermissionCollection = this.getPermissionData(response["permission"]);
    }, error => {
      var msg = error.error.message ? error.error.message : error.message
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }

  getPermissionData(val) {
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

  validCode(event) {
    var enterdValue = event.target.value;
    this.cds.getAllRoles(this.cds.tokenLogin).subscribe(response => {
      var roleCollection = response["roles"];
      for (let i = 0; i < roleCollection.length; i++) {
        if (enterdValue === roleCollection[i].name) {
          this.codeErrorInd = true;
          return;
        } else
          this.codeErrorInd = false;
      }
    }, error => {
      var msg = error.error.message ? error.error.message : error.message
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }

  onPressAddRole() {
    if (this.newRoleForm.valid) {
      var selectedValue = this.newRoleForm.value;
      var perData = [];
      perData.push(selectedValue.permissions);
      var bodyData = {
        "name": selectedValue.name,
        "description": selectedValue.description,
        "permissions": perData,
      }

      this.cds.postRole(bodyData, this.cds.tokenLogin).subscribe(response => {
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
        this.router.navigate(['/admin/role']);
      }, error => {
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newRoleForm.controls) {
        if (this.newRoleForm.controls[name].value == '' || this.newRoleForm.controls[name].value == null) {
          this.newRoleForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: (name + " is Invalid"), timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newRoleForm.controls[name].setErrors(null);
      }
    }
  }

  onPressUpdateRole() {
    if (this.newRoleForm.valid) {
      var selectedValue = this.newRoleForm.value;
      var perData = [];
      perData.push(selectedValue.permissions);
      var bodyData = {
        "name": selectedValue.name,
        "description": selectedValue.description,
        "permissions": perData,
        "isActive": selectedValue.active ? selectedValue.active : false
      }

      this.cds.updateRole(this.cds.roleIdEdit, bodyData, this.cds.tokenLogin).subscribe(response => {
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
      }, error => {
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newRoleForm.controls) {
        if (this.newRoleForm.controls[name].value == '' || this.newRoleForm.controls[name].value == null) {
          this.newRoleForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: (name + " is Invalid"), timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newRoleForm.controls[name].setErrors(null);
      }
    }
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

  bindDisplayValues(val) {
    this.newRoleForm.patchValue({
      name: val.name,
      description: val.description,
      permissions: val.permissions,
      active: val.active,
      id: val.id
    })
  }

}
