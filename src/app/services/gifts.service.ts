import { Injectable } from '@angular/core';
import { Gift } from '../models/gift.model';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GiftsService {
  port:number=7136;

  constructor(private httpClient: HttpClient) { }
  private reloadGiftsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadGifts$: Observable<boolean> = this.reloadGiftsSubject.asObservable();
  
  getGifts(): Observable<Gift[]> {
    let url = `https://localhost:${this.port}/api/Gift/GetGifts`
    return this.httpClient.get<Gift[]>(url);
  }

  getGiftById(id: number): Observable<Gift> {
    let url = `https://localhost:${this.port}/api/Gift/Get/${id}`;
    return this.httpClient.get<Gift>(url);
  }

  saveGift(gift: Gift) :Observable<boolean>{
  
    let url = `https://localhost:${this.port}/api/Gift/UpdateGift`;
    return this.httpClient.put<boolean>(url, gift);
  }

  addGift(gift: Gift): Observable<number> { 
   
    let url = `https://localhost:${this.port}/api/Gift/AddGift`;
    return this.httpClient.post<number>(url, gift);

  }

  deleteGift(id: number): Observable<boolean> {
    let url = `https://localhost:${this.port}/api/Gift/DeleteGift/${id}`;
    return this.httpClient.delete<boolean>(url);

  }
  setReloadGift(){
    let flag = this.reloadGiftsSubject.value;
    this.reloadGiftsSubject.next(!flag);
  }
}
