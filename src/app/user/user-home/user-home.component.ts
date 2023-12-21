import { Component, OnChanges, OnInit ,EventEmitter,Output, Input} from '@angular/core';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftsListComponent } from 'src/app/manager/gifts-list/gifts-list.component';
import { GiftsService } from 'src/app/services/gifts.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers: [ConfirmationService, MessageService]//זה לא אמור להיות קשור 

})
export class UserHomeComponent implements  OnInit {
  constructor(
 private activatedroute: ActivatedRoute,private router:Router,private giftServise :GiftsService
) { }

// @Input()
// count:number=0
// @Output()
// CountChanged:EventEmitter<number>=new EventEmitter<number>()
  
    count:number=0
   
   
  ngOnInit(): void {
    if (sessionStorage.getItem("count")) {
      this.count = JSON.parse(sessionStorage.getItem("count") ?? "0");
    }
  

    setInterval(() => {
      this.count = JSON.parse(sessionStorage.getItem('count')??"0"); // מתעדכן בכל רגע ע"י קריאה לערך מאגר הסשן
    }, 100);
  }

  
  
  goToCart(){
    
    this.router.navigate(["./cart"],{relativeTo:this.activatedroute});
  }

managerDialog: boolean = false;
  password:string="";
  userName:string="";
  flag:boolean=false;
  submitted: boolean = false;

goToManager(){

  //this.managerDialog = true;
  if(this.userName=="manager" && this.password=="manager")
    this.router.navigate(["../manager/manager"],{relativeTo:this.activatedroute});
  else{
    alert("wrong userName or password, please try again");
  }
   this.hideDialog()
}
hideDialog() {
  this.managerDialog = false;
  // this.userDialogChange.emit(this.userDialog);
  this.submitted = false;
}


}