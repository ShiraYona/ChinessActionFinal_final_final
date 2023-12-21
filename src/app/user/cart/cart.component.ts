

import { Component, OnInit ,Input,Output,EventEmitter, OnChanges} from '@angular/core';
import { Gift } from 'src/app/models/gift.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit ,OnChanges{
  constructor(private activatedroute: ActivatedRoute,private router:Router){

  }
cart:Gift[]=[];
gift: Gift = new Gift();
selectedGifts!: Gift[];
total:number=0;
giftDialog: boolean = false;

count: number=0 ;

gifts: Gift[] = [];

submitted!: boolean;
ngOnChanges():void{
  this.count=JSON.parse(sessionStorage.getItem("count")??"0");

}
countdown!: string;
 ngOnInit(): void {
  

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
  this.count=JSON.parse(sessionStorage.getItem("count")??"0");
  this.cart=JSON.parse(sessionStorage.getItem("cart")??"0");
  console.log(this.cart)
  for(let i=0;i<this.cart.length;i++){
    this.gift=this.cart[i];
      this.total+=this.cart[i].cost;
    
 }}

 openNew() {
  this.gift = new Gift();
  this.submitted = false;
  this.giftDialog = true;
}

 placeOrder(){
  if(this.cart.length<1){
    alert("your cart is empty");
    return;
  }
  else{
    this.giftDialog = true;
    this.router.navigate(["../placeOrder"],{relativeTo:this.activatedroute});
  }
  
}
ContinueShopping(){
  this.router.navigate(['../gifts'], { relativeTo: this.activatedroute});
}
countQuntity:number=0;
deleteItem(gift:Gift){
  this.total-=gift.cost
  let index = this.cart.findIndex(prod => prod.id == gift.id);
  if (index !== -1) {
    alert("are you shore?")
    this.cart.splice(index, 1); 
  }
  this.countQuntity=gift.quentity;
  this.count-= this.countQuntity;
  sessionStorage.setItem("count",JSON.stringify(this.count))
    sessionStorage.setItem("cart",JSON.stringify(this.cart));
}
QuentityMinus(gift: Gift){
  debugger
  (sessionStorage.setItem( "count",JSON.stringify(this.count-1)));
  this.count=JSON.parse(sessionStorage.getItem("count")??"0");
  this.total-=gift.cost;
gift.quentity--;
}
QuentityPlus(gift: Gift){
  debugger
  (sessionStorage.setItem( "count",JSON.stringify(this.count+1)));
  this.count=JSON.parse(sessionStorage.getItem("count")??"0");
  this.total+=gift.cost;

  gift.quentity++;
}
}