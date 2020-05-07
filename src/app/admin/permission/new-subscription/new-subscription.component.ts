import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../common-service.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-new-subscription',
  templateUrl: './new-subscription.component.html',
  styleUrls: ['./new-subscription.component.css']
})
export class NewSubscriptionComponent implements OnInit {
  newSubscriptionForm: FormGroup;
  formTitle = "Add New Subscription";
  editInd = false;
  codeErrorInd = false;
  imgURL: any;

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
    //this.imgURL ="assets/images/avt.png"
    this.createForm();
    if (this.cds.subscriptionIdEdit) {
      this.editInd = true;
      this.formTitle = "Update Selected Subscription"
      this.getSubscriptionDetails(this.cds.subscriptionIdEdit);
    }
  }
  createForm() {
    this.newSubscriptionForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      duration: ['', Validators.required],
      amount: ['', Validators.required],
      offPricePerCane: ['', Validators.required],
      maxCane: ['', Validators.required],
      description: ['', Validators.required],
      termsAndCondition: ['', Validators.required],
      nextduration: ['', Validators.required],
      nextamount: ['', Validators.required],
      nextdescription: ['', Validators.required],
      nexttermsAndCondition: ['', Validators.required],
      nextoffPricePerCane: ['', Validators.required],
      nextmaxCane: ['', Validators.required],
      bannerImage: [''],
      id: ['']
    })
  }

  getSubscriptionDetails(id) {
    this.cds.getSingleSubscription(id, this.cds.tokenLogin).subscribe(response => {
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
      "code": val.code ? val.code : "",
      "duration": val.duration ? val.duration : "",
      "amount": val.amount ? val.amount : "",
      "offPricePerCane": val.offPricePerCane ? val.offPricePerCane : "",
      "maxCane": val.maxCane ? val.maxCane : "",
      "description": val.description ? val.description : "",
      "termsAndCondition": val.termsAndCondition ? val.termsAndCondition : "",
      "nextduration": val.nextDuration ? val.nextDuration : "",
      "nextamount": val.nextAmount ? val.nextAmount : "",
      "nextdescription": val.nextdescription ? val.nextdescription : "",
      "nexttermsAndCondition": val.nexttermsAndCondition ? val.nexttermsAndCondition : "",
      "nextoffPricePerCane": val.nextoffPricePerCane ? val.nextoffPricePerCane : "",
      "nextmaxCane": val.nextmaxCane ? val.nextmaxCane : "",
      "bannerImage": val.bannerImage ? val.bannerImage : "",
    }
    return formatJson;
  }
  upperCaseValue(event) {
    event.target.value = event.target.value.toUpperCase();
  }
  validCode(event) {
    var enterdValue = event.target.value;
    this.cds.getAllSubscriptions(this.cds.tokenLogin).subscribe(response => {
      var subscriCollection = response["subscription"];
      for (let i = 0; i < subscriCollection.length; i++) {
        if (enterdValue === subscriCollection[i].code) {
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

  onPressAddSubscription() {
    if (this.newSubscriptionForm.valid) {
      var selectedValue = this.newSubscriptionForm.value;
      var bodyData = {
        "name": selectedValue.name,
        "code": selectedValue.code,
        "duration": selectedValue.duration,
        "amount": selectedValue.amount,
        "offPricePerCane": selectedValue.offPricePerCane,
        "maxCane": selectedValue.maxCane,
        "description": selectedValue.description,
        "termsAndCondition": selectedValue.termsAndCondition,
        "nextduration": selectedValue.nextduration,
        "nextamount": selectedValue.nextamount,
        "nextdescription": selectedValue.nextdescription,
        "nexttermsAndCondition": selectedValue.nexttermsAndCondition,
        "nextoffPricePerCane": selectedValue.nextoffPricePerCane,
        "nextmaxCane": selectedValue.nextmaxCane,
        "bannerImage": this.imgURL,
      }

      this.cds.postSubscription(bodyData, this.cds.tokenLogin).subscribe(response => {
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
      }, error => {
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newSubscriptionForm.controls) {
        if (this.newSubscriptionForm.controls[name].validator && this.newSubscriptionForm.controls[name].value == '' || this.newSubscriptionForm.controls[name].value == null) {
          this.newSubscriptionForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: "Please Enter All values", timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newSubscriptionForm.controls[name].setErrors(null);
      }
    }
  }

  onPressUpdateSubscription() {
    if (this.newSubscriptionForm.valid) {
      var selectedValue = this.newSubscriptionForm.value;
      var bodyData = {
        "name": selectedValue.name,
        "code": selectedValue.code,
        "duration": selectedValue.duration,
        "amount": selectedValue.amount,
        "offPricePerCane": selectedValue.offPricePerCane,
        "maxCane": selectedValue.maxCane,
        "description": selectedValue.description,
        "termsAndCondition": selectedValue.termsAndCondition,
        "nextduration": selectedValue.nextduration,
        "nextamount": selectedValue.nextamount,
        "nextdescription": selectedValue.nextdescription,
        "nexttermsAndCondition": selectedValue.nexttermsAndCondition,
        "nextoffPricePerCane": selectedValue.nextoffPricePerCane,
        "nextmaxCane": selectedValue.nextmaxCane,
        "bannerImage": this.imgURL,
      }

      this.cds.updateSubscription(this.cds.subscriptionIdEdit, bodyData, this.cds.tokenLogin).subscribe(response => {
        this.addToast({ title: 'Success', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'success' });
      }, error => {
        var msg = error.error.message ? error.error.message : error.message;
        this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
      })

    } else {
      for (let name in this.newSubscriptionForm.controls) {
        if (this.newSubscriptionForm.controls[name].validator && this.newSubscriptionForm.controls[name].value == '' || this.newSubscriptionForm.controls[name].value == null) {
          this.newSubscriptionForm.controls[name].markAsTouched();
          this.addToast({ title: 'Error', msg: "Please Enter All values", timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
        }
        else
          this.newSubscriptionForm.controls[name].setErrors(null);
      }
    }
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
    this.imgURL = val.bannerImage;
    this.newSubscriptionForm.patchValue({
      name: val.name,
      code: val.code,
      duration: val.duration,
      amount: val.amount,
      offPricePerCane: val.offPricePerCane,
      maxCane: val.maxCane,
      description: val.description,
      termsAndCondition: val.termsAndCondition,
      nextduration: val.nextduration,
      nextamount: val.nextamount,
      nextdescription: val.nextdescription,
      nexttermsAndCondition: val.nexttermsAndCondition,
      nextoffPricePerCane: val.nextoffPricePerCane,
      nextmaxCane: val.nextmaxCane,
      bannerImage: val.bannerImage,
      id: val.id
    })
  }

}
