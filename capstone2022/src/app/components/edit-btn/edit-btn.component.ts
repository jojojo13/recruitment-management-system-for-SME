import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss'],
})
export class EditBtnComponent implements OnInit {
  @Input('action') action: any;
  constructor() {}

  ngOnInit(): void {}

  editStatus() {}
}
