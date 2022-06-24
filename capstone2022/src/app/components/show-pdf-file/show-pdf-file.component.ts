import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-show-pdf-file',
  templateUrl: './show-pdf-file.component.html',
  styleUrls: ['./show-pdf-file.component.scss']
})
export class ShowPdfFileComponent implements OnInit,OnChanges {
  @Input('pdfSrc') pdfSrc=''
  constructor(public commonService:CommonService) { }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.pdfSrc)
  }

  ngOnInit(): void {
  }

}
