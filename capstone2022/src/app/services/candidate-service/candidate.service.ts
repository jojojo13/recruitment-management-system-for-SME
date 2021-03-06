import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CandidateFilter } from 'src/app/models/CandidateFilter';

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
  public otherList: any;

  listSelectedCandidate: any;
  constructor(private __http: HttpClient) {
    this.skillBehaviour = new BehaviorSubject<boolean>(false);
    this.detectChange = new BehaviorSubject<boolean>(false);
    this.listSelectedCandidate = [];
  }
  getAllcandidateByFilter(obj: CandidateFilter) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetAllCandidateByFillter`,
      obj
    );
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

  insertCandidate(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/CandidateAPI/InsertRcCandidate',
      obj
    );
  }
  CheckDuplicateCandidate(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/CandidateAPI/CheckDuplicateCandidate',
      obj
    );
  }
  getCandidateById(id: number) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetOneInforCandidate?id=${id}`,
      {},
      
    );
  }
  matchingCandidate(obj: any) {
    return this.__http.post(
      'https://localhost:44376/api/CandidateAPI/MatchingCandidate',
      obj
    );
  }

  getCandidateByRequest(obj:any) {
    return this.__http.post(
      `https://localhost:44376/api/CandidateAPI/GetCandidateByRequest`,
      obj,
      // { responseType: 'text' }
    );
  }

  deleteCandidate(arr: Array<number>) {
    return this.__http.post(`https://localhost:44376/api/CandidateAPI/DeleteCandidate`,
      arr
    );
  }

  activeCandidate(arr: Array<number>) {
    return this.__http.post(`https://localhost:44376/api/CandidateAPI/ActiveCandidate`,
      arr
    );
  }

  deActiveCandidate(arr: Array<number>) {
    return this.__http.post(`https://localhost:44376/api/CandidateAPI/DeActiveCandidate`,
      arr
    );
  }


}
