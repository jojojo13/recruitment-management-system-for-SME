import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-show-pdf-file',
  templateUrl: './show-pdf-file.component.html',
  styleUrls: ['./show-pdf-file.component.scss']
})
export class ShowPdfFileComponent implements OnInit {
  @Input('pdfSrc') pdfSrc=''
  constructor(public commonService:CommonService) { }

  ngOnInit(): void {
  }

}
