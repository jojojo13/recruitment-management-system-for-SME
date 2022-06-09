import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.scss'],
})
export class BackBtnComponent implements AfterViewInit {
  @ViewChild('backBtn') backBtn!: ElementRef;
  @Input('link') link = '';
  constructor(private router: Router) {}
  ngAfterViewInit(): void {}

  @HostListener('click')
  onBackBtnComponentClicked(event: MouseEvent) {
    console.log(event.target);

    this.router.navigateByUrl(this.link);
    // Do something with the clicked SVG; maybe read it's ID
  }
}
