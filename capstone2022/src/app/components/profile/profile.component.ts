import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input('candidateName') candidateName='Candidate';
  constructor() { }

  ngOnInit(): void {
  }

}
