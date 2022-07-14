import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-a-candidate-page',
  templateUrl: './view-a-candidate-page.component.html',
  styleUrls: ['./view-a-candidate-page.component.scss']
})
export class ViewACandidatePageComponent implements OnInit {
  route = { name: 'View Candidate', link: '' };
  constructor() { }

  ngOnInit(): void {
  }

}
