import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { cardToggle, cardClose } from './card-animation';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { CommonServiceService } from '../../common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardsmall',
  templateUrl: './cardsmall.component.html',
  styleUrls: ['./cardsmall.component.css'],
  animations: [cardToggle, cardClose],
  encapsulation: ViewEncapsulation.None
})
export class CardsmallComponent implements OnInit {
  position = 'bottom-right';
  title1: string;
  msg: string;
  showClose = true;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  @Input() headerContent: string;
  @Input() selValue: any;
  @Input() title: string;
  @Input() blockClass: string;
  @Input() cardClass: string;
  @Input() classHeader: boolean = false;
  cardToggle: string = 'expanded';
  cardClose: string = 'open';

  fullCard: string;
  fullCardIcon: string;

  constructor(
    public router: Router,
    private toastyService: ToastyService,
    private cds: CommonServiceService) {
    this.fullCardIcon = 'fa-expand';
  }

  ngOnInit() {
  }

  toggleCard() {
    this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }

  closeCard() {
    if (this.selValue.deleteIndicator === "Area")
      this.deleteArea(this.selValue);
    else if (this.selValue.deleteIndicator === "Permission")
      this.deletePermmission(this.selValue);
    else if (this.selValue.deleteIndicator === "Role")
      this.deleteRole(this.selValue);
    else if (this.selValue.deleteIndicator === "App Version")
      this.deleteAppVersion(this.selValue);
    else if (this.selValue.deleteIndicator === "Subscription")
      this.deleteSubscription(this.selValue);
  }
  editCard() {
    if (this.selValue.deleteIndicator === "Area") {
      this.cds.areaIdEdit = this.selValue.id;
      this.router.navigate(['/admin/new-area']);
    } else if (this.selValue.deleteIndicator === "Subscription") {
      this.cds.subscriptionIdEdit = this.selValue.id;
      this.router.navigate(['/admin/new-subscription']);
    } else if (this.selValue.deleteIndicator === "Permission") {
      this.cds.permissionIdEdit = this.selValue.id;
      this.router.navigate(['/admin/new-permis']);
    } else if (this.selValue.deleteIndicator === "Role") {
      this.cds.roleIdEdit = this.selValue.id;
      this.router.navigate(['/admin/new-role']);
    } else if (this.selValue.deleteIndicator === "App Version") {
      this.cds.appVersionIdEdit = this.selValue.id;
      this.router.navigate(['/admin/new-app-version']);
    }
  }

  fullScreen(event) {
    this.fullCard = this.fullCard === 'full-card' ? '' : 'full-card';
    this.fullCardIcon = this.fullCardIcon === 'fa-expand' ? 'fa-compress' : 'fa-expand';
  }

  addToast(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    this.position = options.position ? options.position : this.position;
    const toastOptions: ToastOptions = {
      title: options.title1,
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

  deleteArea(val) {
    this.cds.deleteAreaDetails(val.id, this.cds.tokenLogin).subscribe(response => {
      this.addToast({ title1: 'Info', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      this.cardClose = this.cardClose === 'closed' ? 'open' : 'closed';
    }, error => {
      var msg = error.error.message ? error.error.message : error.message;
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })

  }
  deletePermmission(val) {
    this.cds.deletePermission(val.id, this.cds.tokenLogin).subscribe(response => {
      this.addToast({ title1: 'Info', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      this.cardClose = this.cardClose === 'closed' ? 'open' : 'closed';
    }, error => {
      var msg = error.error.message ? error.error.message : error.message;
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }
  deleteRole(val) {
    this.cds.deleteRole(val.id, this.cds.tokenLogin).subscribe(response => {
      this.addToast({ title1: 'Info', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      this.cardClose = this.cardClose === 'closed' ? 'open' : 'closed';
    }, error => {
      var msg = error.error.message ? error.error.message : error.message;
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }

  deleteAppVersion(val) {
    this.cds.deleteAppVersion(val.id, this.cds.tokenLogin).subscribe(response => {
      this.addToast({ title1: 'Info', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      this.cardClose = this.cardClose === 'closed' ? 'open' : 'closed';
    }, error => {
      var msg = error.error.message ? error.error.message : error.message;
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }
  deleteSubscription(val) {
    this.cds.deleteSubscription(val.id, this.cds.tokenLogin).subscribe(response => {
      this.addToast({ title1: 'Info', msg: response["message"], timeout: 5000, theme: 'bootstrap', position: 'bottom-right', type: 'success' });
      this.cardClose = this.cardClose === 'closed' ? 'open' : 'closed';
    }, error => {
      var msg = error.error.message ? error.error.message : error.message;
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }

}
