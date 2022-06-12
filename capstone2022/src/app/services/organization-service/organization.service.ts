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
}
