import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';

@Component({
  selector: 'app-general-inf-candidate',
  templateUrl: './general-inf-candidate.component.html',
  styleUrls: ['./general-inf-candidate.component.scss'],
})
export class GeneralInfCandidateComponent implements OnInit {
  id!: number;
  candidate: any;
  languageList: any;
  skillSheetList: any;
  expList:any
  outSource:any
  isLoaded = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.candidateService
      .getCandidateById(this.id)
      .subscribe((response: any) => {
        console.log(response.data)
        this.candidate = response.data[0];
        if (response.data[0].language.length > 0) {
          this.languageList = response.data[0].language[0].child;
        }
        if (response.data[0].skillSheet.length > 0) {
          this.skillSheetList = response.data[0].skillSheet;
        }
        if(response.data[0].domain.length > 0){
          this.expList=response.data[0].domain;
   
        }
        if(response.data[0].outSource.length > 0){
          this.outSource=response.data[0].outSource;
   
        }
        this.isLoaded = true;
      });
  }
}
