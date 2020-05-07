import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../../common-service.service';
import { Router } from '@angular/router';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  loginForm: FormGroup;

  constructor(
    public router: Router,
    private cds: CommonServiceService,
    private toastyService: ToastyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
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

  onPressSignIn() {
    if (this.loginForm.valid) {
      var values = this.loginForm.value;
      var enteredData = { "email": values.email, "password": values.password }
      this.cds.getLogin(enteredData).subscribe(response => {
        this.cds.tokenLogin = response["token"];
        this.cds.getCurentUserDetails(response["token"]).subscribe(response => {
          this.cds.currentUserDetail = JSON.parse(JSON.stringify(response));
          this.router.navigate(['/dashboard']);
        }, error => {
          this.cds.tokenLogin = undefined;
          this.addToast({ title: 'Error', msg: error['error'].message, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        })
      }, error => {
        this.addToast({ title: 'Error', msg: error['error'].message, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })
    } else {
      this.addToast({ title: 'Error', msg: 'Enter Valid Email And Password', timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    }
  }
}
