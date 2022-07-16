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
  skillSheetList:any
  isLoaded=false
  constructor(
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.candidateService
      .getCandidateById(this.id)
      .subscribe((response: any) => {
        this.candidate = response.data[0]  
            this.languageList=response.data[0].language[0].child
            this.skillSheetList=response.data[0].skillSheet
         this.isLoaded=true
        
  });
  }
}
