import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-candidate-page',
  templateUrl: './view-candidate-page.component.html',
  styleUrls: ['./view-candidate-page.component.scss']
})
export class ViewCandidatePageComponent implements OnInit {
  route = { name: 'View Candidates', link: 'phanloaitochuc' };
  constructor() { }

  ngOnInit(): void {
  }

}
