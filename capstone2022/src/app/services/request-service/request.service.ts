import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseUrl = 'https://localhost:44376/api/RequestAPI';
  selectedRequest = {
    id: 0,
    name: '',
    code: 'string',
    requestLevel: 0,
    orgnizationId: 0,
    positionID: 0,
    number: 0,
    signId: 0,
    effectDate: '',
    expireDate: '',
    yearExperience: 0,
    level: 0,
    type: 0,
    project: 0,
    budget: 0,
    note: '',
    comment: '',
    status: -1,
    parentID: 0,
    rank: 1,
    createBy: 'HUNGNX',
    createDate: '',
    updateBy: '',
    updateDate: '',
  };
  constructor(private __http: HttpClient) {}

  getRequestByPaging(index: number, size: number) {
    var httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.__http.post(
      this.baseUrl + '/GetAllRequest',
      { index, size },
      httpOptions1
    );
  }
  getChildrenByParentID(parentID: number) {
    let params = new HttpParams().set('parentId', parentID);
    return this.__http.post(
      this.baseUrl + `/GetChildRequestById?parentId=${parentID}`,
      { params: params }
    );
  }
  getAutoGenerateCODE(
    table: string,
    rank: number = 1,
    collumName: string,
    parentID: number = 0
  ) {
    return this.__http.post(
      'https://localhost:44376/api/CommonAPI/autoGenCode',
      { table, rank, collumName, parentID },
      { responseType: 'text' }
    );
  }

  insertRequest(request: any) {
    return this.__http.post(
      'https://localhost:44376/api/RequestAPI/InsertRequest',
      request
    );
  }
  resetDataSelectedRq() {
    this.selectedRequest = {
      id: 0,
      name: '',
      code: 'string',
      requestLevel: 0,
      orgnizationId: 0,
      positionID: 0,
      number: 0,
      signId: 0,
      effectDate: '',
      expireDate: '',
      yearExperience: 0,
      level: 0,
      type: 0,
      project: 0,
      budget: 0,
      note: '',
      comment: '',
      status: -1,
      parentID: 0,
      rank: 1,
      createBy: 'HUNGNX',
      createDate: '',
      updateBy: '',
      updateDate: '',
    };
  }
  editRequest(){
    
  }
}
