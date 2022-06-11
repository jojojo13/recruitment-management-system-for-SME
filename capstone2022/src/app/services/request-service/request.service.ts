import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl='https://localhost:44376/api/RequestAPI'
  constructor(private __http:HttpClient) { }

  getRequestByPaging(index:number,size:number){
    return this.__http.post(this.baseUrl+'/GetAllRequest',{index,size})
  }
  getChildrenByParentID(parentID:number){
    let params = new HttpParams().set('parentId', parentID);
    return this.__http.post(this.baseUrl+`/GetChildRequestById?parentId=${parentID}`,{params:params})
  }
}
