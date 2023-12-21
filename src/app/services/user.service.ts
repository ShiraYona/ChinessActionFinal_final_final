
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  port:number=7136;

  constructor(private httpClient: HttpClient) { }
  private reloadUsersSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadUsers$: Observable<boolean> = this.reloadUsersSubject.asObservable();
  
  getUsers(): Observable<User[]> {
    let url = `https://localhost:${this.port}/api/Users`
    return this.httpClient.get<User[]>(url);
  }
  addUser(user: User): Observable<number> {
    let url = `https://localhost:${this.port}/api/Users`;
    return this.httpClient.post<number>(url, user);

  }
  setReloadUser(){
    let flag = this.reloadUsersSubject.value;
    this.reloadUsersSubject.next(!flag);
  }
}
