import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-skills-and-exp',
  templateUrl: './skills-and-exp.component.html',
  styleUrls: ['./skills-and-exp.component.scss'],
})
export class SkillsAndExpComponent implements OnInit {
  @ViewChild('candidatePoppup') candidatePoppup!: SwalComponent;
  data: any;
  skillCode = '';
  constructor(
    private renderer: Renderer2,
    public readonly swalTargets: SwalPortalTargets
  ) {}

  ngOnInit(): void {}
  addLanguage(data: any) {
    //create wrapper
    let parent = document.querySelector('.language-content') as HTMLElement;
    let item = this.renderer.createElement('div');
    let itemMain = this.renderer.createElement('div');
    let main = this.renderer.createElement('div');
    let category = this.renderer.createElement('div');
    let trash = this.renderer.createElement('i');

    this.renderer.addClass(item, 'language-content-item');
    this.renderer.addClass(itemMain, 'language-content-item-main');
    this.renderer.addClass(main, 'main');
    this.renderer.addClass(category, 'language-content-item-main-category');
    this.renderer.addClass(trash, 'far');
    this.renderer.addClass(trash, 'fa-trash-alt');
    //create ele in side wrapper
    let pOfMain = this.renderer.createElement('p');
    let pForIcon = this.renderer.createElement('p');
    let icon = this.renderer.createElement('i');
    //create class
    this.renderer.addClass(icon, 'far');
    this.renderer.addClass(icon, 'fa-plus');
    this.renderer.addClass(icon, 'circle-icon');
    pOfMain.innerHTML = data.name;

    let listSkill = data.listSkill;
    this.renderer.listen(pForIcon, 'click', () => {
      this.addCertificationOfSkill(category, listSkill);
    });

    this.renderer.listen(trash, 'click', () => {
      this.deleteItem(parent, item);
    });

    this.renderer.appendChild(pForIcon, icon);
    this.renderer.appendChild(main, pOfMain);
    this.renderer.appendChild(main, pForIcon);
    this.renderer.appendChild(main, trash);
    this.renderer.appendChild(itemMain, main);
    this.renderer.appendChild(itemMain, category);
    this.renderer.appendChild(item, itemMain);
    this.renderer.appendChild(parent, item);
  }

  addCertificationOfSkill(target: HTMLElement, listSkill: any) {
    if (listSkill.length > 0) {
      let main = this.renderer.createElement('div');
      let input = this.renderer.createElement('input');
      let select = this.renderer.createElement('select');
      let trash = this.renderer.createElement('i');

      for (let item of listSkill) {
        let option = this.renderer.createElement('option');
        this.renderer.setAttribute(option, 'value', item.id);
        option.innerHTML = item.name;
        this.renderer.appendChild(select, option);
      }
      this.renderer.listen(trash, 'click', () => {
        this.deleteItem(target, main);
      });

      this.renderer.addClass(main, 'main');
      this.renderer.addClass(trash, 'far');
      this.renderer.addClass(trash, 'fa-trash-alt');

      this.renderer.appendChild(main, select);
      this.renderer.appendChild(main, input);
      this.renderer.appendChild(main, trash);
      this.renderer.appendChild(target, main);
    }
  }
  getDataFromPopup($event: any) {
    this.data = $event;
    console.log(this.data);
    this.addLanguage(this.data);
  }
  deleteItem(parent: HTMLElement, child: HTMLElement) {
    parent?.removeChild(child);
    console.log(parent);
  }
}
