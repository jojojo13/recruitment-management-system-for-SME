import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';

@Component({
  selector: 'app-view-candidate-page',
  templateUrl: './view-candidate-page.component.html',
  styleUrls: ['./view-candidate-page.component.scss'],
})
export class ViewCandidatePageComponent implements OnInit {
  route = { name: 'View Candidates', link: 'phanloaitochuc' };
  displayedColumns: string[] = ['id', 'userId', 'title', 'completed'];
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  isLoaded: boolean = false;
  listCandidate: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private candidateService: CandidateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.page = this.activatedRoute.snapshot.queryParams['index'];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams['size'];
    this.loadData(this.page, this.itemsPerPage);
  }
  loadData(index: number, size: number) {
    this.candidateService.getAllcandidateByPaging(index - 1, size).subscribe(
      (response: any) => {
        this.isLoaded = true;
        this.listCandidate = response.data;
        this.totalItems = response.totalItem;
        console.log(response);
      },
      (err) => {
        this.isLoaded = true;
      }
    );
  }
  gty(page: number) {
    this.isLoaded=false
    this.router.navigateByUrl(
      `/ungvien/xemungvien?index=${page}&size=${this.itemsPerPage}`
    );

    this.isLoaded = false;
    this.clearData();

    this.loadData(page , this.itemsPerPage);
  }
  clearData() {
    this.listCandidate = null;
  }
}
