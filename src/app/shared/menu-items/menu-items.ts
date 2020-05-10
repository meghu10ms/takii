import { Injectable } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Dashboard',
    main: [
      {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home'
      }
    ],
  }, {
    label: 'User Operations',
    main: [
      {
        state: 'user',
        name: 'User Operations',
        type: 'sub',
        icon: 'ti-layers',
        children: [
          {
            state: 'user-list',
            name: 'User List'
          }, {
            state: 'add-user',
            name: 'User Registration'
          }
        ]
      }
    ]
  }, {
    label: 'Admin',
    main: [
      {
        state: 'admin',
        name: 'Admin Permissions',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'ads',
            name: 'Ads'
          },
          {
            state: 'offers',
            name: 'Offers'
          },
          {
            state: 'subscriptions',
            name: 'Subscriptions'
          },
          {
            state: 'area',
            name: 'Area'
          },
          {
            state: 'role',
            name: 'Roles'
          },
          {
            state: 'permis',
            name: 'Permissions'
          },
          {
            state: 'app-version',
            name: 'App Versions'
          }
        ]
      }
    ]
  },
];

const MENUITEMSNONSUPERADMIN = [
  {
    label: 'Dashboard',
    main: [
      {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home'
      }
    ],
  }, {
    label: 'User Operations',
    main: [
      {
        state: 'user',
        name: 'User Operations',
        type: 'sub',
        icon: 'ti-layers',
        children: [
          {
            state: 'user-list',
            name: 'User List'
          }, {
            state: 'add-user',
            name: 'User Registration'
          }
        ]
      }
    ]
  }
];

const MENUITEMSWITHOUTADDOPERATION = [
  {
    label: 'Dashboard',
    main: [
      {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home'
      }
    ],
  }, {
    label: 'User Operations',
    main: [
      {
        state: 'user',
        name: 'User Operations',
        type: 'sub',
        icon: 'ti-layers',
        children: [
          {
            state: 'user-list',
            name: 'User List'
          }
        ]
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  constructor(private cds: CommonServiceService) { }
  getAll(): Menu[] {
    //debugger;
    var MENU = [];
    var superAdmin = this.cds.currentUserDetail.isSuperAdmin ? this.cds.currentUserDetail.isSuperAdmin : false;
    if (superAdmin)
      MENU = MENUITEMS;
    else {
      if (this.cds.canAdd)
        MENU = MENUITEMSNONSUPERADMIN;
      else
        MENU = MENUITEMSWITHOUTADDOPERATION;
    }

    return MENU;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
