import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.scss'],
})
export class OverViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input('candidate') candidate: any;
  @Output('listSkill') listSkill = new EventEmitter<any>();
  @Output('listExp') listExp = new EventEmitter<any>();
  list: any;
  listSkillSheet: any;
  listExps: any;
  test: any;
  constructor(
    private candidateService: CandidateService,
    private commonService: CommonService
  ) {}
  ngOnDestroy(): void {
    this.candidateService.otherList = [];
    this.candidateService.skillList = [];
    this.candidateService.skillSheet = [];
    this.candidateService.expList = [];
  }
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    let newArr: any;
    let newArr2: any;
    this.candidateService.detectChange.subscribe((change) => {
      if (change == true) {
        this.list = this.candidateService.otherList;
        this.test = this.candidateService.skillList;
        this.listSkillSheet = this.candidateService.skillSheet;

        this.listExps = this.candidateService.expList;
        newArr2 = this.convert2(this.candidateService.skillSheet);
        newArr = this.convertTypeArray(this.listExps);
      }
    });
    this.commonService.emitBahavior.subscribe((change) => {
      if (this.test) {
        this.listSkill.emit(this.test);
      }
      if (newArr2) {
        this.listSkill.emit(newArr2);
      }
      if (this.listExp) {
        this.listExp.emit(newArr);
      }
      if (newArr2 && this.test) {
        let concatArr = newArr2.concat(this.test);
        this.listSkill.emit(concatArr);
      }
    });
  }
  convertTypeArray(array: any) {
    let newArr = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].listSkill.length; j++) {
        let newobj = {
          typeID: array[i].id,
          firm: array[i].listSkill[j].firm,
          positiob: array[i].listSkill[j].position,
          time: array[i].listSkill[j].time,
        };
        newArr.push(newobj);
      }
    }
    return newArr;
  }
  convert2(array: any) {
    let newArr = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].listSkill.length; j++) {
        let newobj = {
          typeSkill: array[i].id,
          type: array[i].listSkill[j].id,
          level: array[i].listSkill[j].level,
          goal: array[i].listSkill[j].goal,
        };
        newArr.push(newobj);
      }
    }
    return newArr;
  }
}
