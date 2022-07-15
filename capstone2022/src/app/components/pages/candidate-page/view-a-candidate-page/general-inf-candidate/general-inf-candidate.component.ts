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
  constructor(
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.candidateService
      .getCandidateById(this.id)
      .subscribe((response: any) => {
        this.candidate = response.data[0];
        for (let item of response.data[0].listSkill) {
          if(item.id==14){
            this.languageList=item
         
          }
          if(item.id==18){
            this.skillSheetList=item
            console.log(item)
          }
        }
      });
  }
}
