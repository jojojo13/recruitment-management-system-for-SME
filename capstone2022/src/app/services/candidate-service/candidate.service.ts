import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  public skillBehaviour: BehaviorSubject<boolean>;
  public skill: any;
  public skillList: any;
  public skillSheet: any;
  public expList: any;
  public detectChange: BehaviorSubject<boolean>;
  public otherList:any
  constructor(private __http: HttpClient) {
    this.skillBehaviour = new BehaviorSubject<boolean>(false);
    this.detectChange = new BehaviorSubject<boolean>(false);
  }
  getAllcandidateByPaging(index:number,size:number){
    return this.__http.post(`https://localhost:44376/api/CandidateAPI/GetAllCandidate?index=${index}&size=${size}`,{})
  }
  getSkillSheet(code: string) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetSkillSheet?code1=${code}`,
      {}
    );
  }
  getSkillType() {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetTypeSkill?type=2`,
      {}
    );
  }
  insertCandidate(obj:any){
    return this.__http.post('https://localhost:44376/api/CandidateAPI/InsertRcCandidate',obj)
  }
  filterCandidate(obj:any){
    return this.__http.post('https://localhost:44376/api/RequestAPI/GetAllRequestByFilter',obj)
  }
}
