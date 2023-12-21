import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GiftsListComponent } from './manager/gifts-list/gifts-list.component';
import { DonorsListComponent } from './manager/donors-list/donors-list.component';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { UserGiftsListComponent } from './user/user-gifts-list/user-gifts-list.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { CartComponent } from './user/cart/cart.component';
import { UserComponent } from './user/user.component';
import { RaffleComponent } from './manager/raffle/raffle.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'manager',component:ManagerHomeComponent,children:[
   {path:'donors',component:DonorsListComponent},
   {path:'gifts',component:GiftsListComponent},
   {path:'users',component:RaffleComponent}
  ]},
  {path:'user',component:UserHomeComponent,children:[
    {path:'gifts',component:UserGiftsListComponent},
    {path:'cart',component:CartComponent},
    {path:'placeOrder',component:UserComponent}
   
    
   
   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
