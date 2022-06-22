import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-view-request-page',
  templateUrl: './view-request-page.component.html',
  styleUrls: ['./view-request-page.component.scss'],
})
export class ViewRequestPageComponent implements OnInit {
  route={name:'View all request',link:'yeucautuyendung'}
 
  constructor(private reqService:RequestService) {}

  ngOnInit(): void {

  }

  
}
