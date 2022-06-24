import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  baseUrl = 'https://localhost:44376/api/OrgnizationAPI'
  baseCommonUrl = 'https://localhost:44376/api/CommonAPI'
  constructor(private __http:HttpClient) { }

  ngOnInit(): void {
  }
  getAllOrganization(){
    return this.__http.post(this.baseUrl+'/GetAllOrg',{});
  }
  getPositionByOrgID(id:number){
    return this.__http.post(this.baseUrl +`/GetListPositionByOrgID?ID=${id}`,[])
  }

  getOrgByID(id:number){
    return this.__http.post(this.baseUrl+`/getOrgByID?Id=${id}`,{})
  }
  getOtherListType(id:number){
    return this.__http.post(this.baseCommonUrl+`/GetOtherListType?phanHe=${id}`,{})
  }


  getAllTitle(index: number, size: number) {
    return this.__http.post(this.baseUrl +`/GetAllTitle?index=${index}&size=${size}`, {})
  }

  getAllPosition(index: number, size: number) {
    return this.__http.post(this.baseUrl +`/GetAllPosition?index=${index}&size=${size}`, {})
  }


  insertPosition(request: any) {
    return this.__http.post(
      this.baseUrl +'/InsertPosition',
      request
    );
  }
  modifyPosition(request: any) {
    return this.__http.post(
      this.baseUrl +'/ModifyPosition',
      request
    );
  }

  deletePosition(arr: Array<number>) {
    return this.__http.post(
      this.baseUrl +'/DeletePosition',
      arr
    );
  }
 




}
