import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-popup-for-candidate',
  templateUrl: './popup-for-candidate.component.html',
  styleUrls: ['./popup-for-candidate.component.scss'],
})
export class PopupForCandidateComponent implements OnInit, OnChanges {
  @Input('skillCode') skillCode = '';
  @Output('data') data = new EventEmitter<any>();
  listSkill: any;

  selectedSkill ='';
  // @HostListener('document:click', ['$event'])
  // clickout(event: any) {
  //   if (this.eRef.nativeElement.contains(event.target)) {
  //     (document.querySelector('.list') as HTMLElement).style.display = 'block';
  //   } else {
  //     (document.querySelector('.list') as HTMLElement).style.display = 'none';
  //   }
  // }
  constructor(
    private candidateService: CandidateService,
    private commonSerice: CommonService,
    private eRef: ElementRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.skillCode != '') {
      console.log(this.skillCode);
      this.candidateService.getSkillSheet(this.skillCode).subscribe(
        (response: any) => {
          console.log(response);

          this.listSkill = response.data;
        },
        (err) => {
          this.commonSerice.popUpFailed('Something wrong');
        }
      );
    }
  }

  ngOnInit(): void {}
  chooseSkill() {
   
    this.data.emit(this.selectedSkill);
    (document.querySelector('.list') as HTMLElement).style.display = 'none';
  }
  showSelectList() {
  
    (document.querySelector('.list') as HTMLElement).style.display = 'block';
  }
}
