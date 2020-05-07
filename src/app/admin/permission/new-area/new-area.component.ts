import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../common-service.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-new-area',
  templateUrl: './new-area.component.html',
  styleUrls: ['./new-area.component.css']
})
export class NewAreaComponent implements OnInit {
  newUserForm: FormGroup;
  formTitle = "Add New Area";
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
    if (this.cds.areaIdEdit) {
      this.editInd = true;
      this.formTitle = "Update Selected Area"
      this.getAreaDetails(this.cds.areaIdEdit);
    }
  }
  createForm() {
    this.newUserForm = this.fb.group({
      code: ['BNG', Validators.required],
      area: ['', Validators.required],
      name: ['', Validators.required],
      lt: ['', Validators.required],
      lg: ['', Validators.required],
      id: ['']
    })
  }
  getAreaDetails(id) {
    this.cds.getSingleAraeDetails(id, this.cds.tokenLogin).subscribe(response => {
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
      "code": val.areaCode ? val.areaCode : "",
      "area": val.name ? val.name : "",
      "name": val.formattedAddress ? val.formattedAddress : "",
      "lt": val.latitude ? val.latitude : "",
      "lg": val.longitude ? val.longitude : "",
      "id": val._id ? val._id : ""
    }
    return formatJson;
  }

  codeValidation(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    var value = event.currentTarget.value;
    var valLength = value.length;

    if (valLength < 3) {
      if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
        return true;
      } else
        return false;
    } else {
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      } else
        return true;
    }
  }

  upperCaseValue(event) {
    event.target.value = event.target.value.toUpperCase();
  }
  validCode(event) {
    var enterdValue = event.target.value;
    this.cds.getAllAraeDetails(this.cds.tokenLogin).subscribe(response => {
      var areasCollection = response["areas"];
      for (let i = 0; i < areasCollection.length; i++) {
        if (enterdValue === areasCollection[i].areaCode) {
          this.codeErrorInd = true;
          return;
        }else
        this.codeErrorInd = false;
      }
    }, error => {
      var msg = error.error.message ? error.error.message : error.message
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }


  numberOnlyWithDot(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    var value = event.currentTarget.value;
    if (charCode == 46) {
      let dupliDot = value.indexOf(".");
      if (dupliDot == -1 && value.length !== 0)
        return true;
      else
        return false;
    } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else
      return true;
  }

  onPressAddArea() {
    if (this.newUserForm.valid) {
      var selectedValue = this.newUserForm.value;
      var bodyData = {
        "areaCode": selectedValue.code,
        "name": selectedValue.area,
        "formattedAddress": selectedValue.name,
        "latitude": selectedValue.lt,
        "longitude": selectedValue.lg
      }


      this.cds.postAreaDetails(bodyData, this.cds.tokenLogin).subscribe(response => {
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
      }, error => {
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newUserForm.controls) {
        if (this.newUserForm.controls[name].validator && this.newUserForm.controls[name].value == '' || this.newUserForm.controls[name].value == null) {
          this.newUserForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: "Please Enter All values", timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newUserForm.controls[name].setErrors(null);
      }
    }
  }

  onPressUpdateArea() {
    if (this.newUserForm.valid) {
      var selectedValue = this.newUserForm.value;
      var bodyData = {
        "areaCode": selectedValue.code,
        "name": selectedValue.area,
        "formattedAddress": selectedValue.name,
        "latitude": selectedValue.lt,
        "longitude": selectedValue.lg
      }


      this.cds.updateAreaDetails(this.cds.areaIdEdit, bodyData, this.cds.tokenLogin).subscribe(response => {
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
      }, error => {
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newUserForm.controls) {
        if (this.newUserForm.controls[name].validator && this.newUserForm.controls[name].value == '' || this.newUserForm.controls[name].value == null) {
          this.newUserForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: "Please Enter All values", timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newUserForm.controls[name].setErrors(null);
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
    this.newUserForm.patchValue({
      code: val.code,
      area: val.area,
      name: val.name,
      lt: val.lt,
      lg: val.lg,
      id: val.id
    })
  }

}
