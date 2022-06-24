import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss']
})
export class AttachFileComponent implements OnInit {
  @Output() pdfSrc = new EventEmitter<string>();
  @Input('attach') attach:any

  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
  }
  uploadFile(){
    let inputTypeFILE=(document.querySelector('input[type="file"]') as HTMLInputElement)
    inputTypeFILE.click() ;
    inputTypeFILE.addEventListener('change',()=>{
      this.pdfSrc.emit(inputTypeFILE.value)
    })
  }
}
