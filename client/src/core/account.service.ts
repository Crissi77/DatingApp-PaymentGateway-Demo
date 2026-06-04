import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginCreds, order, RegisterCreds, user } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 private http = inject(HttpClient);
 currentUser =signal<user|null>(null);

 baseurl = 'https://localhost:5000/api/'

 register(creds:RegisterCreds){
  return this.http.post<user>(this.baseurl +'account/register',creds).pipe(
    tap(user=>{
      if(user){
        this.setCurrentUser(user);
      }
    })
  )
 }

 login(creds:LoginCreds) {
  return this.http.post<user>(this.baseurl+'account/loginuser',creds).pipe(
    tap(user=>{
      if(user){
        this.setCurrentUser(user);
      }
    })
  )
 }

  setCurrentUser(user: user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

 logout(){
  localStorage.removeItem('user');
  this.currentUser.set(null);
 }


  // Payment Integration with Razor Pay

  createPaymentOrder(){
    return this.http.post<order>(this.baseurl + 'payment/create-order',null);
  }


}
