import { Injectable } from '@angular/core';

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

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
