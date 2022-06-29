import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-skills-and-exp',
  templateUrl: './skills-and-exp.component.html',
  styleUrls: ['./skills-and-exp.component.scss'],
})
export class SkillsAndExpComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}
  addLanguage() {
    //create wrapper
    let parent = document.querySelector('.language-content');
    let item = this.renderer.createElement('div');
    let itemMain = this.renderer.createElement('div');
    let main = this.renderer.createElement('div');
    let category = this.renderer.createElement('div');

    this.renderer.addClass(item, 'language-content-item');
    this.renderer.addClass(itemMain, 'language-content-item-main');
    this.renderer.addClass(main, 'main');
    this.renderer.addClass(category, 'language-content-item-main-category');

    //create ele in side wrapper
    let pOfMain = this.renderer.createElement('p');
    let pForIcon = this.renderer.createElement('p');
    let icon = this.renderer.createElement('i');
    //create class
    this.renderer.addClass(icon, 'fa-solid');
    this.renderer.addClass(icon, 'fa-plus');
    pOfMain.innerHTML = 'Korean';
    this.renderer.listen(pForIcon, 'click', () => {
      this.addCertificationOfSkill(category);
    });

    this.renderer.appendChild(pForIcon, icon);
    this.renderer.appendChild(main, pOfMain);
    this.renderer.appendChild(main, pForIcon);
    this.renderer.appendChild(itemMain, main);
    this.renderer.appendChild(itemMain, category);
    this.renderer.appendChild(item, itemMain);
    this.renderer.appendChild(parent, item);
  }

  addCertificationOfSkill(target: HTMLElement) {
    let main = this.renderer.createElement('div');
    let label = this.renderer.createElement('label');
    let input = this.renderer.createElement('input');
    label.innerHTML = 'IELTS';
    this.renderer.addClass(main, 'main');
    this.renderer.appendChild(main, label);
    this.renderer.appendChild(main, input);
    this.renderer.appendChild(target, main);
  }
}
