import { Router } from '@angular/router';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-request-page',
  templateUrl: './view-request-page.component.html',
  styleUrls: ['./view-request-page.component.scss'],
})
export class ViewRequestPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate() {
    console.log('hehe')
    this.router.navigateByUrl('/yeucautuyendung');
  }
}
