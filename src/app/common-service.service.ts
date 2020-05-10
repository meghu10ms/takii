import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http: HttpClient) { }
  tokenLogin: any;
  viewProfileId: any;
  editUserDetails: any;

  areaIdEdit: any;
  subscriptionIdEdit: any;
  permissionIdEdit: any;
  roleIdEdit: any;
  appVersionIdEdit: any;

  currentUserDetail: any;
  canAdd: any;
  canEdit: any;
  canDelete: any;
  canView: any;

  url = environment.apiUrl;
  ngOnInit() { }

  //get Token global
  getTokenAccess(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer" + " " + token
      })
    }
    return httpOptions;
  }

  /*######################################### MEDIA DETAILS STARTS ##################################### */
  //post media files
  postMedia(body) {
    return this.http.post(this.url + "v1/media/", body);
  }

  //get media 
  getMedia(token, mediaId) {
    return this.http.get(this.url + "v1/media/" + mediaId, this.getTokenAccess(token));
  }

  //delete media 
  deleteMedia(mediaId, token) {
    return this.http.delete(this.url + "v1/media/" + mediaId, this.getTokenAccess(token));
  }
  /*######################################### MEDIA DETAILS ENDS ##################################### */
  /*######################################### App Version DETAILS STARTS ##################################### */
  //get all App Version detail
  getAllAppVersions(token) {
    return this.http.get(this.url + "v1/app-version/", this.getTokenAccess(token));
  }

  //get single App Version detail
  getSingleAppVersion(id, token) {
    return this.http.get(this.url + "v1/app-version/" + id, this.getTokenAccess(token));
  }

  //post App Version detail
  postAppVersion(body, token) {
    return this.http.post(this.url + "v1/app-version/", body, this.getTokenAccess(token));
  }

  //delete App Version details
  deleteAppVersion(appId, token) {
    return this.http.delete(this.url + "v1/app-version/" + appId, this.getTokenAccess(token));
  }

  //update App Version detail
  updateAppVersion(appId, body, token) {
    return this.http.patch(this.url + "v1/app-version/" + appId, body, this.getTokenAccess(token));
  }
  /*######################################### App Version DETAILS Ends ##################################### */
  /*######################################### USER DETAILS STARTS ##################################### */
  //Login details
  getLogin(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.url + "v1/user/login", data, httpOptions);
  }

  //get all user deteails
  getAllUser(token) {
    return this.http.get(this.url + "v1/user/", this.getTokenAccess(token));
  }

  //get current user deteails
  getCurentUserDetails(token) {
    return this.http.get(this.url + "v1/user/current-user", this.getTokenAccess(token));
  }

  //get single user deteails
  getSingleUserDetails(id, token) {
    return this.http.get(this.url + "v1/user/" + id, this.getTokenAccess(token));
  }

  //post user detail
  postUserDetails(body, token) {
    return this.http.post(this.url + "v1/user/", body, this.getTokenAccess(token));
  }

  //update user detail
  updateUserDetails(uId, body, token) {
    return this.http.patch(this.url + "v1/user/" + uId, body, this.getTokenAccess(token));
  }

  //delete user details
  deleteUser(uId, token) {
    return this.http.delete(this.url + "v1/user/" + uId, this.getTokenAccess(token));
  }

  //Change Password
  changePassword(token, body) {
    return this.http.post(this.url + "v1/user/change-password", body, this.getTokenAccess(token));
  }

  /*######################################### USER DETAILS Ends ##################################### */
  /*######################################### Area DETAILS STARTS ##################################### */
  //get all area detail
  getAllAraeDetails(token) {
    return this.http.get(this.url + "v1/area/", this.getTokenAccess(token));
  }

  //get single area detail
  getSingleAraeDetails(id, token) {
    return this.http.get(this.url + "v1/area/" + id, this.getTokenAccess(token));
  }

  //post area detail
  postAreaDetails(body, token) {
    return this.http.post(this.url + "v1/area/", body, this.getTokenAccess(token));
  }

  //delete area details
  deleteAreaDetails(areaId, token) {
    return this.http.delete(this.url + "v1/area/" + areaId, this.getTokenAccess(token));
  }

  //update area detail
  updateAreaDetails(areaCode, body, token) {
    return this.http.patch(this.url + "v1/area/" + areaCode, body, this.getTokenAccess(token));
  }
  /*######################################### Area DETAILS Ends ##################################### */
  /*######################################### Subscription DETAILS STARTS ##################################### */
  //get all Subscription detail
  getAllSubscriptions(token) {
    return this.http.get(this.url + "v1/subscription-plan/", this.getTokenAccess(token));
  }

  //get single Subscription detail
  getSingleSubscription(id, token) {
    return this.http.get(this.url + "v1/subscription-plan/" + id, this.getTokenAccess(token));
  }

  //post Subscription detail
  postSubscription(body, token) {
    return this.http.post(this.url + "v1/subscription-plan/", body, this.getTokenAccess(token));
  }

  //delete Subscription details
  deleteSubscription(areaId, token) {
    return this.http.delete(this.url + "v1/subscription-plan/" + areaId, this.getTokenAccess(token));
  }

  //update Subscription detail
  updateSubscription(subCode, body, token) {
    return this.http.patch(this.url + "v1/subscription-plan/" + subCode, body, this.getTokenAccess(token));
  }
  /*######################################### Subscription DETAILS Ends ##################################### */
  /*######################################### Permission DETAILS STARTS ##################################### */
  //get all Permissions detail
  getAllPermissions(token) {
    return this.http.get(this.url + "v1/permission/", this.getTokenAccess(token));
  }

  //get single Permission detail
  getSinglePermission(id, token) {
    return this.http.get(this.url + "v1/permission/" + id, this.getTokenAccess(token));
  }

  //post Permission detail
  postPermission(body, token) {
    return this.http.post(this.url + "v1/permission/", body, this.getTokenAccess(token));
  }

  //delete Permission details
  deletePermission(perId, token) {
    return this.http.delete(this.url + "v1/permission/" + perId, this.getTokenAccess(token));
  }

  //update Permission detail
  updatePermission(subCode, body, token) {
    return this.http.patch(this.url + "v1/permission/" + subCode, body, this.getTokenAccess(token));
  }
  /*######################################### Permission DETAILS Ends ##################################### */
  /*######################################### Roles DETAILS STARTS ##################################### */
  //get all Roles detail
  getAllRoles(token) {
    return this.http.get(this.url + "v1/role/", this.getTokenAccess(token));
  }

  //get single Role detail
  getSingleRole(id, token) {
    return this.http.get(this.url + "v1/role/" + id, this.getTokenAccess(token));
  }

  //post Role detail
  postRole(body, token) {
    return this.http.post(this.url + "v1/role/", body, this.getTokenAccess(token));
  }

  //delete Role details
  deleteRole(perId, token) {
    return this.http.delete(this.url + "v1/role/" + perId, this.getTokenAccess(token));
  }

  //update Role detail
  updateRole(roleCode, body, token) {
    return this.http.patch(this.url + "v1/role/" + roleCode, body, this.getTokenAccess(token));
  }
  /*######################################### Role DETAILS Ends ##################################### */
}
