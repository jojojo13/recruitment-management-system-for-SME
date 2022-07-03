import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private __http:HttpClient) { }

  getSkillSheet(code:string){
    return  this.__http.post(`https://localhost:44376/api/CandidateAPI/GetSkillSheet?code1=${code}`,{})
  }
}
