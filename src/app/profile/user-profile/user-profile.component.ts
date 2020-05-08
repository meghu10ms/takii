import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../../common-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  viewProfile: FormGroup;
  constructor(
    private fb: FormBuilder,
    private cds: CommonServiceService
  ) { }

  ngOnInit() {
    this.viewProfile = this.fb.group({
      firstname: [{ value: '', disabled: true }, Validators.required],
      lastname: [{ value: '', disabled: true }, Validators.required],
      phone: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      
    })

    this.bindDisplayValues(this.cds.currentUserDetail);
  }

  bindDisplayValues(val) {
    this.viewProfile.patchValue({
      firstname: val["name"] ? val["name"].firstName : "",
      lastname: val["name"] ? val["name"].lastName : "",
      email: val.email,
      phone: val.phoneNumber,
      accountNumber: val["bankDetails"] ? val["bankDetails"].accountNumber : "",
      accountType: val["bankDetails"] ? val["bankDetails"].accountType : "",
      bankName: val["bankDetails"] ? val["bankDetails"].bankName : "",
      branchName: val["bankDetails"] ? val["bankDetails"].branchName : "",
      holderName: val["bankDetails"] ? val["bankDetails"].holderName : "",
      ifscCode: val["bankDetails"] ? val["bankDetails"].ifscCode : "",
      taxNumber: val["bankDetails"] ? val["bankDetails"].taxNumber : ""
    })
  }

}
