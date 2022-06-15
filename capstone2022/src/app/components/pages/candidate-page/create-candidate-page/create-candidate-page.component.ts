import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-candidate-page',
  templateUrl: './create-candidate-page.component.html',
  styleUrls: ['./create-candidate-page.component.scss']
})
export class CreateCandidatePageComponent implements OnInit {
  route={name:'Create New Candidate',link:'/ungvien'}
  attach={name:'Attach CV'}
  attach2={name:'Attach Portfolio'}
  constructor() { }

  ngOnInit(): void {
  }

}
