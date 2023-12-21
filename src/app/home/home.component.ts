import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private activatedroute: ActivatedRoute,private router:Router){

  }
 managerDialog: boolean = false;
  password:string="";
  userName:string="";
  flag:boolean=false;
  submitted: boolean = false;

goToManager(){

  //this.managerDialog = true;
  if(this.userName=="manager" && this.password=="manager")
    this.router.navigate(["./manager"],{relativeTo:this.activatedroute});
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
