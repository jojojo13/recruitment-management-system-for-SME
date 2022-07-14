import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from './../../services/request-service/request.service';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';
import { CandidateService } from 'src/app/services/candidate-service/candidate.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnDestroy {
  fn: any;
  requestList!: any;
  itemsPerPage = 20;
  totalItems!: number;
  page: number = 1;
  isLoaded: boolean = false;
  filterForm!: FormGroup;
  filterObj = {
    code: '',
    name: '',
    orgName: '',
    positionName: '',
    quantity: 0,
    createOn: '1000-01-01T15:37:54.773Z',
    deadLine: '1000-01-01T15:37:54.773Z',
    hrInchange: '',
    status: '',
    otherSkill: '',
    index: this.page - 1,
    size: this.itemsPerPage,
  };
  constructor(
    public requestService: RequestService,
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private auth: AuthorizeService,
    private fb: FormBuilder
  ) {}
  ngOnDestroy(): void {
    document.removeEventListener('click', this.fn, false);
  }

  ngOnInit() {
    this.isLoaded = false;

    this.page = this.activatedRoute.snapshot.queryParams['index'];
    this.itemsPerPage = this.activatedRoute.snapshot.queryParams['size'];

    this.filterForm = this.fb.group({
      name: [''],
      orgName: [''],
      department: [''],
      positionName: [''],
      quantity: [''],
      createOn: [''],
      deadLine: [''],
      hrInchange: [''],
      status: [''],
      otherSkill: [''],
      index: [this.page - 1],
      size: [this.itemsPerPage],
    });
    this.filterForm.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((selectedValue) => {
        this.isLoaded = false;
        this.filterObj.name = this.filterForm.controls['name'].value;
        this.filterObj.orgName = this.filterForm.controls['department'].value;
        this.filterObj.positionName =
          this.filterForm.controls['positionName'].value;
        this.filterObj.quantity = this.filterForm.controls['quantity'].value;
        this.filterObj.createOn = this.filterForm.controls['createOn'].value;
        this.filterObj.deadLine = this.filterForm.controls['deadLine'].value;
        this.filterObj.hrInchange =
          this.filterForm.controls['hrInchange'].value;
        this.filterObj.status = this.filterForm.controls['status'].value;
        this.filterObj.otherSkill =
          this.filterForm.controls['otherSkill'].value;
        this.clearData();
        this.checktoFormat();
        this.unSelectedRequest();
        this.loadData();
      });

    this.commonService.dataChange.subscribe((isChange) => {
      this.clearData();
      this.unSelectedRequest();
      this.loadData();
    });
  }
  navigateEdit(request: any) {
    this.router.navigate(['yeucautuyendung/xemyeucau', request.id]);
  }
  loadData() {
    this.checktoFormat();
    this.filterObj.index = this.page - 1;
    this.filterObj.size = this.itemsPerPage;
    console.log(this.filterObj)
    this.requestService.filterRequest(this.filterObj).subscribe(
      (response: any) => {
        console.log(response)
        this.isLoaded = true;
        this.totalItems = response.totalItem;
        this.requestList = response.data;
      },
      (err) => {
        this.isLoaded = true;
        this.commonService.popUpFailed('Something wrong');
      }
    );
  }

  toggleChildren(clicked: HTMLElement, requestID: number, $event: MouseEvent) {
    let isFirstTimeLoading = this.isFirstTimeLoading(clicked);
    if (isFirstTimeLoading) {
      this.initLoadingWhenCallAPI();
      this.hideButtonWhenCallAPI($event);
      this.process(requestID, clicked, $event);
    }

    let next = clicked.nextElementSibling; // set next element to "nextElementSibling" relative to passed element.
    let nextSiblingLevel = parseInt(next?.getAttribute('level') as string);
    let clickedLevel = parseInt(clicked?.getAttribute('level') as string);
    while (
      next &&
      next.classList.contains('children') &&
      nextSiblingLevel > clickedLevel
    ) {
      if (nextSiblingLevel == clickedLevel + 1) {
        next?.classList.toggle('hide'); // check for existence and class
        next = next.nextElementSibling; // if it exists, but the class does not, move to the next element and repeat.
        nextSiblingLevel = parseInt(next?.getAttribute('level') as string);
      } else {
        if (!next.classList.contains('hide')) {
          next?.classList.toggle('hide'); // check for existence and class
          next = next.nextElementSibling; // if it exists, but the class does not, move to the next element and repeat.
          nextSiblingLevel = parseInt(next?.getAttribute('level') as string);
        } else {
          next = next.nextElementSibling; // if it exists, but the class does not, move to the next element and repeat.
          nextSiblingLevel = parseInt(next?.getAttribute('level') as string);
        }
      }
    }
  }

  initLoadingWhenCallAPI() {
    document.body.style.cursor = 'wait';
  }
  removeLoading() {
    document.body.style.cursor = 'initial';
  }

  isFirstTimeLoading(ele: HTMLElement) {
    if (!ele.classList.contains('loaded')) {
      return true;
    }
    return false;
  }

  flagNOTFirstTimeLoading(ele: HTMLElement) {
    ele.classList.toggle('loaded');
  }

  hideButtonWhenCallAPI($event: MouseEvent) {
    ($event.target as HTMLElement).style.display = 'none';
  }
  showButton($event: MouseEvent) {
    ($event.target as HTMLElement).style.display = 'block';
  }

  loadingDone($event: MouseEvent, ele: HTMLElement) {
    this.removeLoading();
    this.showButton($event);
    this.flagNOTFirstTimeLoading(ele);
  }

  gty(page: number) {
    this.router.navigateByUrl(
      `yeucautuyendung/xemyeucau?index=${page}&size=${this.itemsPerPage}`
    );

    this.isLoaded = false;
    this.clearData();

    this.loadData();
  }

  clearData() {
    this.requestList = null;
  }

  addClass(ele: ElementRef, className: string) {
    this.renderer.addClass(ele, className);
  }
  insertAfter(newNode: HTMLElement, existingNode: HTMLElement) {
    existingNode.parentNode?.insertBefore(newNode, existingNode.nextSibling);
  }

  process(requestID: number, parent: HTMLElement, $event: MouseEvent) {
    this.requestService.getChildrenByParentID(requestID).subscribe(
      (response: any) => {
        this.createRow(parent, response);
        this.loadingDone($event, parent);
      },
      (err) => {
        this.loadingDone($event, parent);
      }
    );
  }
  checktoFormat() {
    if (this.filterForm.controls['createOn'].value == '') {
      this.filterObj.createOn = '1000-01-01T15:37:54.773Z';
    }
    if (this.filterForm.controls['deadLine'].value == '') {
      this.filterObj.deadLine = '1000-01-01T15:37:54.773Z';
    }
    if (this.filterForm.controls['quantity'].value == '') {
      this.filterObj.quantity = 0;
    }
  }

  createRow(parent: HTMLElement, response: any) {
    let list = response.data;
    let nodeArr = [];
    for (let rq of list) {
      let redInRGB = 214;
      let tr = this.renderer.createElement('tr');
      let td0 = this.renderer.createElement('td');
      let input = this.renderer.createElement('input');
      this.renderer.setAttribute(input, 'type', 'checkbox');
      this.renderer.setAttribute(input, 'value', rq.id);

      let otherSkillname = rq.otherSkillname;
      if (otherSkillname == null) {
        otherSkillname = "";
      }

      let hrInchange = rq.hrInchange;
      if (hrInchange == null) {
        hrInchange = "";
      }


      this.renderer.appendChild(td0, input);
      this.renderer.listen(input, 'click', (e) => {
        this.selectedChange(rq.id, e);
      });
      let td = this.renderer.createElement('td');
      td.innerHTML = `${rq.code}`;
      let td2 = this.renderer.createElement('td');
      td2.innerHTML = `${rq.name}`;
      let td3 = this.renderer.createElement('td');
      td3.innerHTML = `${otherSkillname}`;
      let td4 = this.renderer.createElement('td');
      td4.innerHTML = `${rq.department}`;
      let td5 = this.renderer.createElement('td');
      td5.innerHTML = `${rq.position}`;
      let td6 = this.renderer.createElement('td');
      td6.innerHTML = `${rq.quantity}`;
      let td7 = this.renderer.createElement('td');
      td7.innerHTML = `${rq.createdOnString}`;
      let td8 = this.renderer.createElement('td');
      td8.innerHTML = `${rq.deadlineString}`;
      let td9 = this.renderer.createElement('td');
      td9.innerHTML = `${hrInchange}`;
      let td10 = this.renderer.createElement('td');
      let p = this.renderer.createElement('p');
      let text = rq.status.toLowerCase();
      if (rq.rank > 2) {
        redInRGB += rq.rank * 8;
      }
      tr.style.backgroundColor = `rgb(${redInRGB},249,213)`;

      p.innerHTML = `${text}`;
      if (rq.statusID == 1) {
        this.addClass(p, 'draft');
      }
      if (rq.statusID == 2) {
        this.addClass(p, 'submitted');
      }
      if (rq.statusID == 5 || 0) {
        this.addClass(p, 'reject');
      }
      if (rq.statusID == 4) {
        this.addClass(p, 'approved');
      }
      if (rq.statusID == 3) {
        this.addClass(p, 'cancel');
      }
      td10.appendChild(p);
      let td11 = this.renderer.createElement('td');
      let i = this.renderer.createElement('i');
      this.renderer.listen(i, 'click', (evt) => {
        this.toggleChildren(tr, rq.id, evt);
      });
      this.addClass(i, 'fas');
      this.addClass(i, 'fa-angle-down');
      td11.appendChild(i);
      tr.appendChild(td0);
      tr.appendChild(td);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);
      tr.appendChild(td8);
      tr.appendChild(td9);
      tr.appendChild(td10);
      tr.appendChild(td11);
      nodeArr.push(tr);
      this.renderer.listen(tr, 'click', (evt) => {
        this.getSelectedRQ(rq, tr);
      });
      this.renderer.listen(tr, 'dblclick', (evt) => {
        this.navigateEdit(rq);
      });
      this.addClass(tr, 'children');
      this.renderer.setAttribute(tr, 'level', rq.rank);
      for (let i = 0; i < tr.childNodes - 1; i++) {
        this.renderer.setAttribute(tr[i], 'level', rq.rank);
      }
    }
    this.insertListNodeToElement(nodeArr, parent);
  }

  insertListNodeToElement(list: Array<HTMLElement>, parent: HTMLElement) {
    for (let ele of list) {
      this.insertAfter(ele, parent);
      parent = ele;
    }
  }
  getSelectedRQ(request: any, clicked: any) {
    this.requestService.selectedRequest = request;
    this.clearClass();
    clicked.classList.add('selected');
  }
  clearClass() {
    let tr: any = document.querySelectorAll('tbody tr');
    for (let i = 0; i < tr.length; i++) {
      let item = tr[i];
      item.classList.remove('selected');
    }
  }
  clearSelectedRequest = (e: MouseEvent) => {
    let target = (e.target as HTMLElement).parentElement;
    if (!target?.hasAttribute('level')) {
      this.requestService.resetDataSelectedRq();
      this.clearClass();
    }
  };
  unSelectedRequest() {
    this.fn = this.clearSelectedRequest.bind(this);
    document.addEventListener('click', this.fn, false);
  }
  selectedChange(request: any, event: any) {
    if (event.target.checked) {
      this.requestService.listSelectedRequest.push(request);
    } else {
      let index = this.requestService.listSelectedRequest.findIndex(
        (req: any) => req.id == request.id
      );
      this.requestService.listSelectedRequest.splice(index, 1);
    }
  }
}
