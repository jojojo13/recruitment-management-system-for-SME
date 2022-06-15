import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss']
})
export class AttachFileComponent implements OnInit {
  @Input('attach') attach:any
  constructor() { }

  ngOnInit(): void {
  }

}
