import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { getStorage, ref, listAll } from 'firebase/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as firebase from 'firebase/compat';
@Component({
  selector: 'app-cv-candidate',
  templateUrl: './cv-candidate.component.html',
  styleUrls: ['./cv-candidate.component.scss'],
})
export class CvCandidateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    public sanitizer: DomSanitizer,
    private storage: AngularFireStorage
  ) {}
  pdfSrc: any;
  listFile: any;
  ngOnInit(): void {
    var storageRef = this.storage.ref('uploads/UV3');

    // Now we get the references of these images
    storageRef.listAll().subscribe(
      (result: any) => {
        result.items.forEach((imageRef: any) => {
          // And finally display them
          let extendsionFile = imageRef.name.slice(
            ((imageRef.name.lastIndexOf('.') - 1) >>> 0) + 2
          );

          if (extendsionFile == 'pdf') {
            imageRef.getDownloadURL().then((url: any) => {
              this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            });
          }
        });
      },
      (error) => {
        // Handle any errors
      }
    );
  }
}
