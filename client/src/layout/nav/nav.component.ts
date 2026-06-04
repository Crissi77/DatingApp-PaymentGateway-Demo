import { Component, inject, signal } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AccountService } from '../../core/account.service';
import { Observable } from 'rxjs';
import { user } from '../../../types/user';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../app/toast.service';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastService);
  protected credentials:any ={};
  protected isLoggedIn = signal(false);
  protected currentUser? :user;

  ngOnInit(){}


  login(){
    this.accountService.login(this.credentials).subscribe({
      next:(result:user)=>{
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in Successfully');
      
      },
      error:(err)=>{
        this.toast.error(err.error);
      }
    });
  }

  logout(){
   this.accountService.logout();
   this.credentials = {};
   this.router.navigateByUrl('/');
  }

}
