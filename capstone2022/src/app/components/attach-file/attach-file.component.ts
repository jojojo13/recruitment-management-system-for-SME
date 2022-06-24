import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss']
})
export class AttachFileComponent implements OnInit {
  @Input('attach') attach:any
  src=''
  constructor() { }

  ngOnInit(): void {
  }
  uploadFile(){
    let inputTypeFILE=(document.querySelector('input[type="file"]') as HTMLInputElement)
    inputTypeFILE.click() ;
    inputTypeFILE.addEventListener('change',()=>{
      this.src=inputTypeFILE.value
      console.log(this.src)
    })
  }
}
