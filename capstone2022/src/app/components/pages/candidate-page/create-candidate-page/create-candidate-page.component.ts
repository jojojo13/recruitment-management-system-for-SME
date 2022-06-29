import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-candidate-page',
  templateUrl: './create-candidate-page.component.html',
  styleUrls: ['./create-candidate-page.component.scss'],
})
export class CreateCandidatePageComponent implements OnInit {
  @Input('name') name = 'Candidate';
  route = { name: 'Create New Candidate', link: '/ungvien' };
  attach = { name: 'Attach CV' };
  attach2 = { name: 'Attach Portfolio' };
  pdfSrc = '';
  step = 1;

  constructor() {}

  ngOnInit(): void {}
  getPdfSrc(src: string) {
    this.pdfSrc = src;
  }
  getStep(step: number) {
    this.step = step;
  }
  getName(name: string) {
    this.name = name;
  }
}
