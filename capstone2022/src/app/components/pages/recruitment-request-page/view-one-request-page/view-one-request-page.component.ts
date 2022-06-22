import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-view-one-request-page',
  templateUrl: './view-one-request-page.component.html',
  styleUrls: ['./view-one-request-page.component.scss']
})
export class ViewOneRequestPageComponent implements OnInit {
  route:any={name:'View any request',link:'yeucautuyendung'}
  constructor(public requestService:RequestService) { }

  ngOnInit(): void {
  }

}
