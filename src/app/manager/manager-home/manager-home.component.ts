import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-manager-home',
  
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css'],
  template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>`
})
export class ManagerHomeComponent implements OnInit{
ngOnInit(): void {
    
}
}
