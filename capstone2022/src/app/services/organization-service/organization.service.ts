import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  baseUrl = 'https://localhost:44376/api/OrgnizationAPI'
  baseCommonUrl = 'https://localhost:44376/api/CommonAPI'
  baseProfileUrl = 'https://localhost:44376/api/ProfileAPI'
  constructor(private __http: HttpClient) { }

  ngOnInit(): void {
  }
  getAllOrganization() {
    return this.__http.post(this.baseUrl + '/GetAllOrg', {});
  }
  getPositionByOrgID(id: number) {
    return this.__http.post(this.baseProfileUrl + `/GetListPositionByOrgID?ID=${id}`, [])
  }

  getOrgByID(id: number) {
    return this.__http.post(this.baseUrl + `/getOrgByID?Id=${id}`, {})
  }
  getOtherListType(id: number) {
    return this.__http.post(this.baseCommonUrl + `/GetOtherListType?phanHe=${id}`, {})
  }


  getAllTitle(index: number, size: number) {
    return this.__http.post(this.baseUrl + `/GetAllTitle?index=${index}&size=${size}`, {})
  }

  getAllPosition(index: number, size: number) {
    return this.__http.post(this.baseUrl + `/GetAllPosition?index=${index}&size=${size}`, {})
  }


  insertPosition(request: any) {
    return this.__http.post(
      this.baseUrl + '/InsertPosition',
      request
    );
  }
  modifyPosition(request: any) {
    return this.__http.post(
      this.baseUrl + '/ModifyPosition',
      request
    );
  }

  deletePosition(arr: Array<number>) {
    return this.__http.post(
      this.baseUrl + '/DeletePosition',
      arr
    );
  }

  checkPositionExist(orgId: number, positionId: number) {
    return this.__http.post(this.baseUrl + `/CheckPositionExist?orgId=${orgId}&positionId=${positionId}`, {})
  }

  getAllPositionOrg(index: number, size: number) {
    return this.__http.post(this.baseUrl + `/GetAllPositionOrg?index=${index}&size=${size}`, {})
  }

  insertPositionOrg(request: any) {
    return this.__http.post(
      this.baseUrl + '/InsertPositionOrg',
      request
    );
  }
  modifyPositionOrg(request: any) {
    return this.__http.post(
      this.baseUrl + '/ModifyPositionOrg',
      request
    );
  }
  deletePositionOrg(arr: Array<number>) {
    return this.__http.post(
      this.baseUrl + '/DeletePositionOrg',
      arr
    );
  }


}
