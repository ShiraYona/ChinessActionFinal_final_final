import { Component, OnInit,Output ,EventEmitter} from '@angular/core';
import { Gift } from 'src/app/models/gift.model';
import { GiftsService } from 'src/app/services/gifts.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { flush } from '@angular/core/testing';

//אוף תעתיקי לי זה לא עובד
@Component({
  selector: 'app-user-gifts-list',
  templateUrl: './user-gifts-list.component.html',
  styleUrls: ['./user-gifts-list.component.css'],
  providers: [ConfirmationService, MessageService, CarouselModule],


})



export class UserGiftsListComponent implements OnInit {
  autoplayInterval: number = 4000;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  show:boolean = false;

  showButton(): void { this.show = true; }
  
  hideButton(): void { this.show = false; } 
  giftDialog: boolean = false;
  gifts: Gift[] = [];

  gift: Gift = new Gift();

  selectedGifts!: Gift[];

  submitted!: boolean;

  cart: Gift[] = [];

  count: number = 0;
  constructor(
    public giftService: GiftsService, private messageService: MessageService, private confirmationService: ConfirmationService, private activatedroute: ActivatedRoute, private router: Router

  ) { }
  countdown!: string;
  ngOnInit() {
    const targetDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000 + 25 * 60 * 1000 + 15 * 1000);
   
       const countdownInterval = setInterval(() => {
         const currentDate = new Date();
         const remainingTime = targetDate.getTime() - currentDate.getTime();
   
         if (remainingTime <= 0) {
           this.countdown = 'Time is up!';
           clearInterval(countdownInterval);
           alert('Time is up!');
         } else {
           const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
           const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
           const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
           const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
   
           this.countdown = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
         }
       }, 1000);
     
    if (sessionStorage.getItem("count")) {
      this.count = JSON.parse(sessionStorage.getItem("count") ?? "0");
    }
    if (sessionStorage.getItem("cart")) {
      this.cart = JSON.parse(sessionStorage.getItem("cart") ?? "v");
    }
    this.giftService.reloadGifts$.subscribe(x => {
      this.giftService.getGifts().subscribe(data => this.gifts = data);
    });
  }

// @Output()
// CountChanged:EventEmitter<number>=new EventEmitter<number>()
flag:boolean=false
  addToCart(gift: Gift) {
this.flag=false
    this.cart.forEach(element => {
      if(element.id==gift.id){
      element.quentity+=1;
      sessionStorage.setItem("cart", JSON.stringify(this.cart));
      this.flag=true
      }
    });
    if(!this.flag){
    this.cart.push(gift);
    sessionStorage.setItem("cart", JSON.stringify(this.cart));
  }
  this.count++;
    sessionStorage.setItem("count", JSON.stringify(this.count))
  }
 
  goToCart() {
    this.router.navigate(["../cart"], { relativeTo: this.activatedroute });
  }
}
  
   









  
