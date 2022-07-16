import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-show-pdf-file',
  templateUrl: './show-pdf-file.component.html',
  styleUrls: ['./show-pdf-file.component.scss'],
})
export class ShowPdfFileComponent implements OnInit, OnChanges {
  @Input('pdfSrc') pdfSrc = '';
  byPassSecurrityURL: any;
  constructor(
    public commonService: CommonService,
    public sanitizer: DomSanitizer
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes')
    console.log(this.pdfSrc)
    this.byPassSecurrityURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.pdfSrc
    );
    console.log(
      this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc) + 'asdasd'
    );
    console.log('2')
  }

  ngOnInit(): void {}
  getSrc(ele: any) {
    console.log(ele.src);
  }
}
