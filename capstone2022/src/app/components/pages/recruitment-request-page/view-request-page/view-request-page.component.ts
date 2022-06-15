import { Router } from '@angular/router';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-request-page',
  templateUrl: './view-request-page.component.html',
  styleUrls: ['./view-request-page.component.scss'],
})
export class ViewRequestPageComponent implements OnInit {
  route={name:'View all request',link:'yeucautuyendung'}
  constructor(private router: Router) {}

  ngOnInit(): void {}

  
}
