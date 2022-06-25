import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseProfileUrl = 'https://localhost:44376/api/ProfileAPI'
  constructor(private __http: HttpClient) { }

  getNationList() {
    return this.__http.post(this.baseProfileUrl + '/GetNation', {});
  }

  getProvinceByNationId(id: number) {
    return this.__http.post(this.baseProfileUrl + `/GetProvinceByNationId?nationID=${id}`, {})
  }

  getDistrictByProvinceId(id: number) {
    return this.__http.post(this.baseProfileUrl + `/GetDistrictByProvinceId?provinceId=${id}`, {})
  }

  getWardByDistrictId(id: number) {
    return this.__http.post(this.baseProfileUrl + `/GetWardByDistrictId?DistrictID=${id}`, {})
  }

}
