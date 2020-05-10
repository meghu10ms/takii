import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { state, style, transition, animate, trigger, AUTO_STYLE } from '@angular/animations';
import 'rxjs/add/operator/filter';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../common-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideOnOff', [
      state('on', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('off', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out'))
    ]),
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  isSupAdmin = false;
  profilePictureUrl: any;

  deviceType = 'desktop';
  verticalNavType = 'expanded';
  verticalEffect = 'shrink';
  chatToggle = 'out';
  chatInnerToggle = 'off';
  innerHeight: string;
  isScrolled = false;
  isCollapsedMobile = 'no-block';
  toggleOn = true;
  windowWidth: number;

  public profileName: any;

  @ViewChild('searchFriends', /* TODO: add static flag */ { static: false }) search_friends: ElementRef;
  @ViewChild('toggleButton', /* TODO: add static flag */ { static: false }) toggle_button: ElementRef;
  @ViewChild('sideMenu', /* TODO: add static flag */ { static: false }) side_menu: ElementRef;

  config: any;

  constructor(
    public menuItems: MenuItems,
    public router: Router,
    private cds: CommonServiceService
  ) {
    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributs(this.windowWidth);
  }

  ngOnInit() {
    if (this.cds.tokenLogin === undefined || this.cds.tokenLogin === "") {
      this.router.navigate(['/']);
    } else {
      var selectedAdmin = this.cds.currentUserDetail.name;
      this.profilePictureUrl = this.cds.currentUserDetail.profilePicture ? this.cds.currentUserDetail.profilePicture : "assets/images/user.png"
      this.profileName = (selectedAdmin.title ? selectedAdmin.title : "") + " " + (selectedAdmin.firstName ? selectedAdmin.firstName : "") + " " + (selectedAdmin.lastName ? selectedAdmin.lastName : "");
      var sp = selectedAdmin.isSuperAdmin ? selectedAdmin.isSuperAdmin : false;
      if (sp) {
        this.isSupAdmin = true;
      } else {
        this.isSupAdmin = false;
      }
    }
  }

  onClickedOutside(e: Event) {
    if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType !== 'offcanvas') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
    }
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    let reSizeFlag = true;
    if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }

    if (reSizeFlag) {
      this.setMenuAttributs(this.windowWidth);
    }
  }

  setMenuAttributs(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.deviceType = 'tablet';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'push';
    } else if (windowWidth < 768) {
      this.deviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.deviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
  }


  toggleOpened() {
    if (this.windowWidth < 768) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    } else {
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    }
  }
  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }

  onScroll(event) {
    this.isScrolled = false;
  }

  onPressLogout() {
    this.router.navigate(['/']);
  }

  onProfile() {
    this.cds.viewProfileId = undefined;
    this.router.navigate(['/user-profile']);
  }

}
