import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-one-request-page',
  templateUrl: './view-one-request-page.component.html',
  styleUrls: ['./view-one-request-page.component.scss']
})
export class ViewOneRequestPageComponent implements OnInit {
  route:any={name:'View any request',link:'yeucautuyendung'}
  constructor() { }

  ngOnInit(): void {
  }

}
