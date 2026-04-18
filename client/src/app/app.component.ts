import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { CommonModule} from "@angular/common";
import { NavComponent } from "../layout/nav/nav.component";
import { AccountService } from '../core/account.service';
import { HomeComponent } from '../features/home/home.component';
import { lastValueFrom } from 'rxjs';
import { user } from '../../types/user';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, NavComponent,HomeComponent]
})
export class AppComponent implements OnInit {

  title ='DatingApp'
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected members = signal<user[]>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers(){
    try{
      return lastValueFrom(this.http.get<user[]>('https://localhost:5000/api/Member'));
    }
    catch(error){
      console.log('error while fetching members',error);
     throw error;
    }
  }
}
