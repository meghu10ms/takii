import { Component, OnInit } from '@angular/core';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { CommonServiceService } from '../../common-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  isBusy = false;
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  changePass: FormGroup;

  constructor(
    private toastyService: ToastyService,
    private fb: FormBuilder,
    private cds: CommonServiceService
  ) { }

  ngOnInit() {
    this.changePass = this.fb.group({
      id: [''],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('newPassword', 'confirmPassword')
    })

    this.changePass.patchValue({
      id: this.cds.currentUserDetail._id
    })
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onPressChangePassword() {
    if (this.changePass.invalid) {
      this.addToast({ title: 'Error', msg: 'Enter Values', timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      return;
    }
    var data = {
      "currentPassword": this.changePass.value.oldPassword,
      "newPassword": this.changePass.value.newPassword
    }
    this.isBusy = true;
    this.cds.changePassword(this.cds.tokenLogin, data).subscribe(response => {
      this.isBusy = false;
      this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
    }, error => {
      this.isBusy = false;
      this.addToast({ title: 'Error', msg: error.error.error.message, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
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

}
