import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matching-btn',
  templateUrl: './matching-btn.component.html',
  styleUrls: ['./matching-btn.component.scss'],
})
export class MatchingBtnComponent implements OnInit {
  @ViewChild('requestPicker') requestPicker!: SwalComponent;
  constructor(public readonly swalTargets: SwalPortalTargets, private router: Router) {}
  ngOnInit(): void {}
  popupRequest() {
    this.requestPicker.fire();
  }
}
