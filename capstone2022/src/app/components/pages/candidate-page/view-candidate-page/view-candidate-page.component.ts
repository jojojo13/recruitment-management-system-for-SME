import { debounceTime } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateFilter } from 'src/app/models/CandidateFilter';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';

@Component({
  selector: 'app-view-candidate-page',
  templateUrl: './view-candidate-page.component.html',
  styleUrls: ['./view-candidate-page.component.scss'],
})
export class ViewCandidatePageComponent implements OnInit,OnDestroy {
  route = { name: 'View Candidates', link: 'phanloaitochuc' };
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  isLoaded: boolean = false;
  listCandidate: any;
  candidateFilter!: CandidateFilter;
  candidateForm!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnDestroy(): void {
    this.candidateService.listSelectedCandidate=[]
  }

  ngOnInit(): void {
    this.candidateFilter = new CandidateFilter();
    this.initForm();
    this.isLoaded = false;
    this.page = this.activatedRoute.snapshot.queryParams['index'];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams['size'];
    this.candidateFilter.index = this.page - 1;
    this.candidateFilter.size = this.itemsPerPage;
    this.loadData();
  }
  loadData() {
    this.clearData()
    console.log(this.candidateFilter);
    this.candidateService
      .getAllcandidateByFilter(this.candidateFilter)
      .subscribe(
        (response: any) => {
          this.isLoaded = true;
          this.listCandidate = response.data;
          this.totalItems = response.totalItem;
          console.log(response.data);
        },
        (err) => {
          this.isLoaded = true;
        }
      );
  }
  gty(page: number) {
    this.isLoaded = false;
    this.router.navigateByUrl(
      `/ungvien/xemungvien?index=${page}&size=${this.itemsPerPage}`
    );

    this.clearData();
    this.candidateFilter.index = page - 1;
    this.loadData();
  }
  clearData() {
    this.isLoaded=false
    this.listCandidate = null;
  }
  initForm() {
    this.candidateForm = this.fb.group({
      id: [''],
      name: [''],
      yob: [''],
      phone: [''],
      email: [''],
      location: [''],
      position: [''],
      exp: [''],
      languages: [''],
    });
    this.candidateForm.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((selectedValue) => {
        this.candidateFilter.name = this.candidateForm.controls['name'].value;
        if (this.candidateForm.controls['yob'].value != '') {
          this.candidateFilter.yob = this.candidateForm.controls['yob'].value;
        }

        this.candidateFilter.phone = this.candidateForm.controls['phone'].value;
        this.candidateFilter.email = this.candidateForm.controls['email'].value;
        this.candidateFilter.location =this.candidateForm.controls['location'].value;
        this.candidateFilter.position = this.candidateForm.controls['position'].value;
        this.candidateFilter.yearExp = this.candidateForm.controls['exp'].value;
        this.candidateFilter.language = this.candidateForm.controls['languages'].value;
          this.loadData()
      });
  }
  navigateToView(candidate: any) {
    this.router.navigateByUrl(`ungvien/xemungvien/info?id=${candidate.id}`);
  }
  selectedChange(candidate: any, event: any) {
    if (event.target.checked) {
      this.candidateService.listSelectedCandidate.push(candidate.id);
      let wrapper=event.target.parentElement
      let parent=wrapper.parentElement
      parent.classList.add('selected')
    } else {
      let index = this.candidateService.listSelectedCandidate.findIndex(
        (id: number) => id == candidate.id
      );
      let wrapper=event.target.parentElement
      let parent=wrapper.parentElement
      parent.classList.remove('selected')
      this.candidateService.listSelectedCandidate.splice(index, 1);
    }
    console.log(this.candidateService.listSelectedCandidate)
  }
}
