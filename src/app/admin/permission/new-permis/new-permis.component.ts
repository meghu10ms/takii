import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../common-service.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-new-permis',
  templateUrl: './new-permis.component.html',
  styleUrls: ['./new-permis.component.css']
})
export class NewPermisComponent implements OnInit {
  newPermissionForm: FormGroup;
  formTitle = "Add New Permission";
  editInd = false;
  codeErrorInd = false;

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
    private toastyService: ToastyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    if (this.cds.permissionIdEdit) {
      this.editInd = true;
      this.formTitle = "Update Selected Permission"
      this.getPermissionDetails(this.cds.permissionIdEdit);
    }
  }

  createForm() {
    this.newPermissionForm = this.fb.group({
      name: ['', Validators.required],
      module: ['', Validators.required],
      description: ['', Validators.required],
      add: [''],
      view: [''],
      delete: [''],
      edit: [''],
      active: [''],
      id: ['']
    })
  }

  getPermissionDetails(id) {
    this.cds.getSinglePermission(id, this.cds.tokenLogin).subscribe(response => {
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
      "module": val.module ? val.module : "",
      "description": val.description ? val.description : "",
      "add": val.add,
      "view": val.view,
      "edit": val.edit,
      "delete": val.delete,
      "active": val.isActive,
      "id": val._id ? val._id : ""
    }
    return formatJson;
  }

  validCode(event) {
    var enterdValue = event.target.value;
    this.cds.getAllPermissions(this.cds.tokenLogin).subscribe(response => {
      var perCollection = response["permission"];
      for (let i = 0; i < perCollection.length; i++) {
        if (enterdValue === perCollection[i].name) {
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

  onPressAddPermission() {
    if (this.newPermissionForm.valid) {
      var selectedValue = this.newPermissionForm.value;
      var bodyData = {
        "name": selectedValue.name,
        "module": selectedValue.module,
        "description": selectedValue.description,
        "add": selectedValue.add ? selectedValue.add : false,
        "view": selectedValue.view ? selectedValue.view : false,
        "edit": selectedValue.edit ? selectedValue.edit : false,
        "delete": selectedValue.delete ? selectedValue.delete : false,
        "isActive": selectedValue.active ? selectedValue.active : false,
      }


      this.cds.postPermission(bodyData, this.cds.tokenLogin).subscribe(response => {
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
      }, error => {
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newPermissionForm.controls) {
        if (this.newPermissionForm.controls[name].validator && this.newPermissionForm.controls[name].value == '' || this.newPermissionForm.controls[name].value == null) {
          this.newPermissionForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: "Please Enter All values", timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newPermissionForm.controls[name].setErrors(null);
      }
    }
  }

  onPressUpdatePermission() {
    if (this.newPermissionForm.valid) {
      var selectedValue = this.newPermissionForm.value;
      var bodyData = {
        "name": selectedValue.name,
        "module": selectedValue.module,
        "description": selectedValue.description,
        "add": selectedValue.add,
        "view": selectedValue.view,
        "edit": selectedValue.edit,
        "delete": selectedValue.delete,
        "isActive": selectedValue.active,
      }


      this.cds.updatePermission(this.cds.permissionIdEdit, bodyData, this.cds.tokenLogin).subscribe(response => {
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
      }, error => {
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newPermissionForm.controls) {
        if (this.newPermissionForm.controls[name].validator && this.newPermissionForm.controls[name].value == '' || this.newPermissionForm.controls[name].value == null) {
          this.newPermissionForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: "Please Enter All values", timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newPermissionForm.controls[name].setErrors(null);
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
    this.newPermissionForm.patchValue({
      name: val.name,
      module: val.module,
      description: val.description,
      add: val.add,
      view: val.view,
      edit: val.edit,
      delete: val.delete,
      active: val.active,
      id: val.id
    })
  }

}

