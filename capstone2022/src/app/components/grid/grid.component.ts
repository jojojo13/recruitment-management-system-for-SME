import { RequestService } from './../../services/request-service/request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  requestList!: any;
  itemsPerPage = 4;
  totalItems!: number;
  page: number = 1;
  isLoaded: boolean = false;
  constructor(public requestService: RequestService) {}

  ngOnInit() {
    this.loadData()
  }
  loadData(){
    this.requestService
    .getRequestByPaging(0, this.itemsPerPage)
    .subscribe((response: any) => {
      let data = response.data;
      this.requestList = this.addChildrenArrayToObject(data);
      console.log(this.requestList);
      this.totalItems = response.totalPage;
      this.isLoaded = true;
    });
  }
  toggleChildren(parent: HTMLElement) {
    let children = parent.nextSibling as HTMLElement;
    if (children.tagName == 'TR') {
      children?.classList.toggle('active');
    }
  }
  gty(page: number) {
    this.isLoaded = false;
    this.clearData();
    this.loadData()
  }
  clearData() {
    this.requestList = null;
  }

  getRequestByRank(rank: number, array: Array<any>) {
    let list = array.filter((request) => {
      return request.rank == rank;
    });
    return list;
  }

  addChildrenArrayToObject(arr1: any) {
    let parentRequests = this.getRequestByRank(1, arr1);
    console.log(parentRequests);
    let childrentRq = this.getRequestByRank(2, arr1);
    for (let request of parentRequests) {
      let addedChildren = childrentRq.filter((requestChildren) => {
        return requestChildren.parentId == request.id;
      });
      request.children = addedChildren;
    }
    return parentRequests;
  }
}
