import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { CommonServiceService } from '../../../common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isBusy = false;

  isViewPermission : any;

  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  dataSource: any;
  displayedColumns: string[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private toastyService: ToastyService,
    private cds: CommonServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isViewPermission = this.cds.canView;
    this.cds.viewProfileId = undefined;
    this.getDeatails();
  }

  getDeatails() {
    this.isBusy = true;
    this.cds.getAllUser(this.cds.tokenLogin).subscribe(response => {
      this.isBusy = false;
      var data = this.getTableData(response["users"]);
      const ELEMENT_DATA = data;
      this.displayedColumns = ['name', 'email', 'phone', 'active', 'area', 'role', 'actions'];
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.isBusy = false;
      var msg = error.error.message ? error.error.message : error.message
      this.addToast({ title: 'Error', msg: msg, timeout: 5000, theme: 'bootstrap', position: 'bottom-center', type: 'error' });
    })
  }

  getTableData(val) {
    var formatJson = {};
    var finalData = [];
    for (let i = 0; i < val.length; i++) {
      var title = val[i].name ? val[i].name.title : ""
      var name = val[i].name ? val[i].name.firstName : ""
      var lname = val[i].name ? val[i].name.lastName : ""
      formatJson = {
        "name": title + " " + name + " " + (lname ? lname : ""),
        "email": val[i].email ? val[i].email : "",
        "phone": val[i].phoneNumber ? val[i].phoneNumber : "",
        "active": val[i].isActive ? val[i].isActive : "",
        "fcmToken": val[i].fcmToken ? val[i].fcmToken : "",
        "area": val[i].area[0] ? val[i].area[0].areaCode : "",
        "role": val[i].role ? val[i].role["name"] : "",
        "id": val[i]._id ? val[i]._id : "",
      }
      finalData.push(formatJson);
      formatJson = {};
    }
    return finalData;
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewUser(value) {
    this.cds.viewProfileId = value.id;
    this.router.navigate(['/user/view-user']);
  }

}
export interface PeriodicElement {
  name: string;
  email: string;
  active: string;
  phone: number;
  area: string;
  role: string;
}

