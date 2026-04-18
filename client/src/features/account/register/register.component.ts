import { Component, inject, input, output, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, user } from '../../../../types/user';
import { AccountService } from '../../../core/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

 protected creds = {} as RegisterCreds;
 cancelEvent = output<boolean>() ;
 accountService = inject(AccountService);

  register(){
    this.accountService.register(this.creds).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:err => console.log(err)
    })
  }

  cancel(){
    debugger;
    this.cancelEvent.emit(false);
  }


}
