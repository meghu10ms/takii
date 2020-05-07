import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { cardToggle, cardClose } from './card-animation';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../common-service.service';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.css'],
  animations: [cardToggle, cardClose],
  encapsulation: ViewEncapsulation.None
})
export class CardEventComponent implements OnInit {
  @Input() headerContent: string;
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
    private cds: CommonServiceService
  ) {
    this.fullCardIcon = 'fa-expand';
  }

  ngOnInit() {
  }

  toggleCard() {
    this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }

  AddCard(event) {
    if (this.title === "Ads Collection")
      this.router.navigate(['/admin/new-ads']);
    else if (this.title === "Offers Collection")
      this.router.navigate(['/admin/new-offer']);
    else if (this.title === "Subscriptions Collection") {
      this.cds.subscriptionIdEdit = undefined;
      this.router.navigate(['/admin/new-subscription']);
    }
    else if (this.title === "Area Collection") {
      this.cds.areaIdEdit = undefined;
      this.router.navigate(['/admin/new-area']);
    }
    else if (this.title === "Roles Collection") {
      this.cds.roleIdEdit = undefined;
      this.router.navigate(['/admin/new-role']);
    }
    else if (this.title === "Permissions Collection") {
      this.cds.permissionIdEdit = undefined;
      this.router.navigate(['/admin/new-permis']);
    }
    else if (this.title === "App Versions Collection") {
      this.cds.appVersionIdEdit = undefined;
      this.router.navigate(['/admin/new-app-version']);
    }

  }

  fullScreen(event) {
    this.fullCard = this.fullCard === 'full-card' ? '' : 'full-card';
    this.fullCardIcon = this.fullCardIcon === 'fa-expand' ? 'fa-compress' : 'fa-expand';
  }
}
