import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request-service/request.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(public requestService:RequestService) { }

  ngOnInit(): void {
  }

}
