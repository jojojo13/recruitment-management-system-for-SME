import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  baseUrl='https://localhost:44376/api/OrgnizationAPI'
  constructor(private __http:HttpClient) { }

  ngOnInit(): void {
  }
  getAllOrganization(){
    return this.__http.post(this.baseUrl+'/GetAllOrg',{});
  }
  getPositionByOrgID(id:number){
    return this.__http.post(`https://localhost:44376/api/ProfileAPI/GetListPositionByOrgID?ID=${id}`,[])
  }

  getOrgByID(id:number){
    return this.__http.post(this.baseUrl+`/getOrgByID?Id=${id}`,{})
  }
  getOtherListType(id:number){
    return this.__http.post(`https://localhost:44376/api/CommonAPI/GetOtherListType?phanHe=${id}`,{})
  }


  getAllTitle(index: number, size: number) {
    return this.__http.post(`https://localhost:44376/api/OrgnizationAPI/GetAllTitle?index=${index}&size=${size}`, {})
  }

  getAllPosition(index: number, size: number) {
    return this.__http.post(`https://localhost:44376/api/OrgnizationAPI/GetAllPosition?index=${index}&size=${size}`, {})
  }


  insertPosition(request: any) {
    return this.__http.post(
      'https://localhost:44376/api/OrgnizationAPI/InsertPosition',
      request
    );
  }
  modifyPosition(request: any) {
    return this.__http.post(
      'https://localhost:44376/api/OrgnizationAPI/ModifyPosition',
      request
    );
  }

  deletePosition(arr: Array<number>) {
    return this.__http.post(
      'https://localhost:44376/api/OrgnizationAPI/DeletePosition',
      arr
    );
  }
 




}
