import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization-service/organization.service';

@Component({
  selector: 'app-pop-up-organizations',
  templateUrl: './pop-up-organizations.component.html',
  styleUrls: ['./pop-up-organizations.component.scss'],
})
export class PopUpOrganizationsComponent implements OnInit {
  @Output('department') department:EventEmitter<any> =new EventEmitter<any>();
  organizationList!: any;
  constructor(
    private orgService: OrganizationService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.generateElement();
  }
  generateElement() {
    this.orgService.getAllOrganization().subscribe((response: any) => {
      this.organizationList = response.data;
      let content = document.querySelector('.popup') as HTMLElement;

      for (let org of this.organizationList) {
        let main = this.renderer.createElement('div');
        this.renderer.addClass(main, 'master');
        let p = this.renderer.createElement('p');
        let arrow = this.renderer.createElement('i');
        this.renderer.addClass(arrow, 'fal');
        this.renderer.addClass(arrow, 'fa-angle-down');
        p.appendChild(arrow);
        let folderIcon = this.renderer.createElement('i');
        this.renderer.addClass(folderIcon, 'fas');
        this.renderer.addClass(folderIcon, 'fa-folder');
        p.appendChild(folderIcon);
        const text = this.renderer.createText(org.name);
        //add click listener
        this.renderer.listen(p,'click',(evt)=>{
          let department={id:org.id,name:org.name}
          this.department.emit(department)
        })
        this.renderer.appendChild(p, text);
        main.appendChild(p);
        content?.appendChild(main);
        this.renderer.setAttribute(main, 'level', org.level);
        this.render(org, content);
      }
    });
  }
  render(org: any, parent: HTMLElement) {
    let flag = org.children;
    if (flag.length > 0) {
      for (let child of org.children) {
        let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'child');
        let p = this.renderer.createElement('p');
        let arrow = this.renderer.createElement('i');
        this.renderer.addClass(arrow, 'fal');
        this.renderer.addClass(arrow, 'fa-angle-down');
        p.appendChild(arrow);
        let folderIcon = this.renderer.createElement('i');
        this.renderer.addClass(folderIcon, 'fas');
        this.renderer.addClass(folderIcon, 'fa-folder');
        p.appendChild(folderIcon);
        const text = this.renderer.createText(org.name);
         //add click listener
         this.renderer.listen(p,'click',(evt)=>{
          let department={id:org.id,name:org.name}
          this.department.emit(department)
        })
        this.renderer.appendChild(p, text);
        div.appendChild(p);
        parent?.appendChild(div);
        this.renderer.setAttribute(div, 'level', child.level);
        this.render(child, div);
      }
    }
  }
}
