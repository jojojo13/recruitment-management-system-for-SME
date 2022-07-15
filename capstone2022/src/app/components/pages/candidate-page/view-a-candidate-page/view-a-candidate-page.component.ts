import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-a-candidate-page',
  templateUrl: './view-a-candidate-page.component.html',
  styleUrls: ['./view-a-candidate-page.component.scss']
})
export class ViewACandidatePageComponent implements OnInit {
  route = { name: 'View Candidate', link: '' };
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute
    .queryParams
    .subscribe(params => {
        let thing = params['id'];
        console.log(params)
    });
  }

}
