import { Component, inject, signal } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AccountService } from '../../core/account.service';
import { Observable } from 'rxjs';
import { user } from '../../../types/user';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  protected accountService = inject(AccountService)
  protected credentials:any ={}
  protected isLoggedIn = signal(false);
  protected currentUser? :user;

  ngOnInit(){}


  login(){
    this.accountService.login(this.credentials).subscribe({
      next:(result:user)=>{
        console.log(result);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  logout(){
   this.accountService.logout();
   this.credentials = null;
  }

}
