import { Component, OnInit } from '@angular/core';
import { Gift } from '../../models/gift.model';
import { GiftsService } from '../../services/gifts.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Winner } from 'src/app/models/winner.model';
@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class RaffleComponent implements OnInit {

  giftDialog: boolean = false;

  gifts: Gift[] = [];

  gift: Gift = new Gift();

  selectedGifts!: Gift[];

  submitted!: boolean;

  users: User[] = []
  constructor(public giftService: GiftsService, private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.giftService.reloadGifts$.subscribe(x => {
      this.giftService.getGifts().subscribe(data => this.gifts = data);
    });
    this.userService.reloadUsers$.subscribe(x => {
      this.userService.getUsers().subscribe(data => this.users = data)
    })
  }

  openNew() {
    this.gift = new Gift();
    this.submitted = false;
    this.giftDialog = true;
  }
  Selected_Users: User[] = []
  winner: User = new User;
  winners:Winner[]=[];
  win:Winner=new Winner();
flag:boolean=false;
  randome(gift: Gift) {
   
    this.Selected_Users = []
  
    let giftId = gift.id;
    for (let i = 0; i < this.users.length; i++) {
      var user = this.users[i];
      user.tickets.map(x => {
        if (x.id == giftId)
          this.Selected_Users.push(user)
      })
    }

    var c = Math.floor(Math.random() * this.Selected_Users.length)
    this.winner = this.Selected_Users[c];
    this.win.userId=this.winner.id;
    this.win.userName=this.winner.userName;
    this.win.giftId=gift.id;
    this.win.giftImage=gift.image;
    this.win.giftName=gift.name;
  this.winners.push(this.win);
  this.win=new Winner();
  
    this.deleteGift(gift);
    if(this.gifts.length==1){
      this.flag=true
    }

  }
  deleteGift(gift: Gift) {
    let id=gift.id;
    console.log(id);
    
    this.confirmationService.confirm({
      message: `the winner ${this.winner.userName} registerd in our system ` + gift.name ,
       header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gifts = this.gifts.filter(val => val.id !== gift.id);
      //  this.giftService.deleteGift(id).subscribe();
        this.gift = new Gift();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Deleted', life: 3000 });
       }
    });
    // this.giftService.delete(gift.id);????????????
   }

}
