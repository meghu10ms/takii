import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../common-service.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-new-app-version',
  templateUrl: './new-app-version.component.html',
  styleUrls: ['./new-app-version.component.css']
})
export class NewAppVersionComponent implements OnInit {
  newAppVersionForm: FormGroup;
  formTitle = "Add New App Version";
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
    if (this.cds.appVersionIdEdit) {
      this.editInd = true;
      this.formTitle = "Update Selected Area"
      this.getAppVersionDetails(this.cds.appVersionIdEdit);
    }
  }
  createForm() {
    this.newAppVersionForm = this.fb.group({
      version: ['', Validators.required],
      description: ['', Validators.required],
      active: [''],
      id: ['']
    })
  }

  getAppVersionDetails(id) {
    this.cds.getSingleAppVersion(id, this.cds.tokenLogin).subscribe(response => {
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
      "version": val.version ? val.version : "",
      "description": val.description ? val.description : "",
      "active": val.isActive ? val.isActive : "",
      "id": val._id ? val._id : ""
    }
    return formatJson;
  }

  validCode(event) {
    var enterdValue = event.target.value;
    this.cds.getAllAppVersions(this.cds.tokenLogin).subscribe(response => {
      var appVersionCollection = response["appVersions"];
      for (let i = 0; i < appVersionCollection.length; i++) {
        if (enterdValue === appVersionCollection[i].version) {
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

  onPressAddAppVersion() {
    if (this.newAppVersionForm.valid) {
      var selectedValue = this.newAppVersionForm.value;
      var bodyData = {
        "version": selectedValue.version,
        "description": selectedValue.description,
        "isActive": selectedValue.active ? selectedValue.active : false,
      }

      this.cds.postAppVersion(bodyData, this.cds.tokenLogin).subscribe(response => {
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
      }, error => {
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newAppVersionForm.controls) {
        if (this.newAppVersionForm.controls[name].value == '' || this.newAppVersionForm.controls[name].value == null) {
          this.newAppVersionForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: (name + " is Invalid"), timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newAppVersionForm.controls[name].setErrors(null);
      }
    }
  }
  onPressUpdateAppVersion() {
    if (this.newAppVersionForm.valid) {
      var selectedValue = this.newAppVersionForm.value;
      var bodyData = {
        "version": selectedValue.version,
        "description": selectedValue.description,
        "isActive": selectedValue.active ? selectedValue.active : false,
      }

      this.cds.updateAppVersion(this.cds.appVersionIdEdit, bodyData, this.cds.tokenLogin).subscribe(response => {
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
      }, error => {
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newAppVersionForm.controls) {
        if (this.newAppVersionForm.controls[name].value == '' || this.newAppVersionForm.controls[name].value == null) {
          this.newAppVersionForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: (name + " is Invalid"), timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newAppVersionForm.controls[name].setErrors(null);
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
    this.newAppVersionForm.patchValue({
      version: val.version,
      description: val.description,
      active: val.active,
      id: val.id
    })
  }

}
