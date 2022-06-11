import { RequestService } from './../../services/request-service/request.service';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  fake = {
    data: [
      {
        id: 2,
        code: 'RC002',
        name: 'Tuyển dụng .NET',
        requestLevel: 'Chưa cần gấp',
        department: 'Phòng ban tuyển dụng',
        position: 'Lập trình viên',
        quantity: 4,
        createdOn: '2022-06-10T00:00:00',
        deadline: '2022-06-30T00:00:00',
        office: 'Nguyễn Xuân Hùng',
        status: 'pending',
        parentId: 1,
        rank: 2,
        note: 'HUNGNX',
        comment: 'HUNGNX',
        hrInchange: 'Vũ Hồng Sơn',
      },
      {
        id: 3,
        code: 'RC002',
        name: 'Tuyển dụng .NET',
        requestLevel: 'Chưa cần gấp',
        department: 'Phòng ban tuyển dụng',
        position: 'Lập trình viên',
        quantity: 4,
        createdOn: '2022-06-10T00:00:00',
        deadline: '2022-06-30T00:00:00',
        office: 'Nguyễn Xuân Hùng',
        status: 'pending',
        parentId: 1,
        rank: 2,
        note: 'HUNGNX',
        comment: 'HUNGNX',
        hrInchange: 'Vũ Hồng Sơn',
      },
      {
        id: 3,
        code: 'RC002',
        name: 'Tuyển dụng .NET',
        requestLevel: 'Chưa cần gấp',
        department: 'Phòng ban tuyển dụng',
        position: 'Lập trình viên',
        quantity: 4,
        createdOn: '2022-06-10T00:00:00',
        deadline: '2022-06-30T00:00:00',
        office: 'Nguyễn Xuân Hùng',
        status: 'pending',
        parentId: 1,
        rank: 2,
        note: 'HUNGNX',
        comment: 'HUNGNX',
        hrInchange: 'Vũ Hồng Sơn',
      },
    ],
  };
  requestList!: any;
  itemsPerPage = 2;
  totalItems!: number;
  page: number = 1;
  isLoaded: boolean = false;

  constructor(
    public requestService: RequestService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.loadData(0);
  }

  loadData(pageIndex: number) {
    this.requestService
      .getRequestByPaging(pageIndex, this.itemsPerPage)
      .subscribe((response: any) => {
        this.requestList = response.data;
        console.log(response.data);
        this.totalItems = response.totalItem;
        this.isLoaded = true;
      });
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
      nextSiblingLevel == clickedLevel + 1
    ) {
      next?.classList.toggle('hide'); // check for existence and class
      next = next.nextElementSibling; // if it exists, but the class does not, move to the next element and repeat.
      nextSiblingLevel = parseInt(next?.getAttribute('level') as string);
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
    this.isLoaded = false;
    this.clearData();
    this.loadData(page - 1);
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

  createRow(parent: HTMLElement, response: any) {
    let list = response.data;

    for (let rq of list) {
      let tr = this.renderer.createElement('tr');
      let td = this.renderer.createElement('td');
      td.innerHTML = `${rq.code}`;
      let td2 = this.renderer.createElement('td');
      td2.innerHTML = `${rq.name}`;
      let td3 = this.renderer.createElement('td');
      td3.innerHTML = `${rq.requestLevel}`;
      let td4 = this.renderer.createElement('td');
      td4.innerHTML = `${rq.department}`;
      let td5 = this.renderer.createElement('td');
      td5.innerHTML = `${rq.position}`;
      let td6 = this.renderer.createElement('td');
      td6.innerHTML = `${rq.quantity}`;
      let td7 = this.renderer.createElement('td');
      td7.innerHTML = `${rq.createdOn}`;
      let td8 = this.renderer.createElement('td');
      td8.innerHTML = `${rq.deadline}`;
      let td9 = this.renderer.createElement('td');
      td9.innerHTML = `${rq.hrInchange}`;
      let td10 = this.renderer.createElement('td');
      let p = this.renderer.createElement('p');
      p.innerHTML = `${rq.status}`;
      if (rq.status == 'pending') {
        this.addClass(p, 'pending');
      }
      if (rq.status == 'approve') {
        this.addClass(p, 'approve');
      }
      if (rq.status == 'reject') {
        this.addClass(p, 'reject');
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
      this.insertAfter(tr, parent);
      this.addClass(tr, 'children');
      this.renderer.setAttribute(tr, 'level', rq.rank);
    }
  }
}
