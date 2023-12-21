
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserComponent {
  frmPayment: FormGroup = new FormGroup({}); 

  constructor(private userService: UserService, private messageService: MessageService) {
    this.frmPayment = new FormGroup({
      creditCardNumber: new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
      //, [Validators.required,Validators.pattern('[0-9]{16}')])
      password: new FormControl('',[Validators.required]),
      username:new FormControl('',[Validators.required])
    })
  }
  
  creditCardNumber:string="";
  passwordReexpiryDategister:string=""
  password:string=""
  username:string="";
  user: User = new User();
   flag:boolean=false;
orderId:number=0;
  submitted: boolean = false;
  @Input()
  userDialog: boolean = true;

  @Output()
  userDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();



  hideDialog() {
    this.userDialog = false;
    this.userDialogChange.emit(this.userDialog);
    this.submitted = false;
  }



  addUser(){
    this.submitted = true;
    this.flag=true;
    this.user.id=0;
    this.user.userName=this.frmPayment.get("username")?.value;
    this.user.password=this.frmPayment.get("password")?.value;
    this.user.creditCard=this.frmPayment.get("creditCardNumber")?.value;
    this.user.tickets=JSON.parse(sessionStorage.getItem("cart")??"v")
    this.userService.addUser(this.user).subscribe(a => {
    this.orderId=a;
      this.userService.setReloadUser();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
    });

    this.hideDialog()
  }




}
