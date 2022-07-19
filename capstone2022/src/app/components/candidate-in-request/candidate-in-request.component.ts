import { debounceTime } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CandidateFilter } from 'src/app/models/CandidateFilter';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';
import { CommonService } from 'src/app/services/common.service';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-candidate-in-request',
  templateUrl: './candidate-in-request.component.html',
  styleUrls: ['./candidate-in-request.component.scss']
})
export class CandidateInRequestComponent implements OnInit {
  @ViewChild('orgPicker') candidatePicker!: SwalComponent;
  candidateForm!: FormGroup;
  listCandidate:any
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  isLoaded: boolean = false;
  candidateFilter!: CandidateFilter;
  constructor(  private commonService: CommonService,
    public auth: AuthorizeService,
    public readonly swalTargets: SwalPortalTargets,
    private candidateService:CandidateService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.candidateFilter = new CandidateFilter();
  }
  gty(page: number) {
    this.isLoaded = false;
    // this.router.navigateByUrl(
    //   `/ungvien/xemungvien?index=${page}&size=${this.itemsPerPage}`
    // );

    this.clearData();
    this.candidateFilter.index = page - 1;
    // this.loadData();
  }
  navigateToView(a:any){}
  clearData() {
    this.isLoaded=false
    this.listCandidate = null;
  }
  // initForm() {
  //   this.candidateForm = this.fb.group({
  //     id: [''],
  //     name: [''],
  //     yob: [''],
  //     phone: [''],
  //     email: [''],
  //     location: [''],
  //     position: [''],
  //     exp: [''],
  //     languages: [''],
  //   });
  //   this.candidateForm.valueChanges
  //     .pipe(debounceTime(2000))
  //     .subscribe((selectedValue) => {
  //       this.candidateFilter.name = this.candidateForm.controls['name'].value;
  //       if (this.candidateForm.controls['yob'].value != '') {
  //         this.candidateFilter.yob = this.candidateForm.controls['yob'].value;
  //       }

  //       this.candidateFilter.phone = this.candidateForm.controls['phone'].value;
  //       this.candidateFilter.email = this.candidateForm.controls['email'].value;
  //       this.candidateFilter.location =this.candidateForm.controls['location'].value;
  //       this.candidateFilter.position = this.candidateForm.controls['position'].value;
  //       this.candidateFilter.yearExp = this.candidateForm.controls['exp'].value;
  //       this.candidateFilter.language = this.candidateForm.controls['languages'].value;
  //         // this.loadData()
  //     });
  // }
}
