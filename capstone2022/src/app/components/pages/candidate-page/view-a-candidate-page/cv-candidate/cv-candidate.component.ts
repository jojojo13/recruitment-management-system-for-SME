import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { getStorage, ref, listAll } from 'firebase/storage';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-cv-candidate',
  templateUrl: './cv-candidate.component.html',
  styleUrls: ['./cv-candidate.component.scss'],
})
export class CvCandidateComponent implements OnInit {
  constructor(
    private commonService: CommonService,
    public sanitizer: DomSanitizer
  ) {}
  pdfSrc: any;
  ngOnInit(): void {
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, 'uploads/UV3');

    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef: any) => {
        console.log(itemRef);

          this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            itemRef.path_
          );
          // All the items under listRef.
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }
  getFile() {
    this.commonService
      .getFile()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          // store the key
          changes.map((c) => ({ key: c.payload.key }))
        )
      )
      .subscribe((fileUploads) => {
        console.log(fileUploads);
      });
  }
}
