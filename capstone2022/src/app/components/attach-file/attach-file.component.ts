import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUpload } from 'src/app/models/FileUpload';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss'],
})
export class AttachFileComponent implements OnInit {
  @Output() pdfSrc = new EventEmitter<string>();
  @Input('attach') attach: any;
  selectedFiles!: FileList;
  currentFileUpload!: FileUpload;
  percentage!: number;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload(): void {
    const file = this.selectedFiles.item(0) as File;

    this.currentFileUpload = new FileUpload(file);
    console.log(file)
    // this.commonService.pushFileToStorage(this.currentFileUpload).subscribe(
    //   (percentage: any) => {
    //     this.percentage = Math.round(percentage ? percentage : 0);
    //     this.commonService.fileBehavior.subscribe((change: boolean) => {
    //       if (change == true) {
    //         this.pdfSrc.emit(this.commonService.fileUrl);
    //       }
    //     });
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }
}
