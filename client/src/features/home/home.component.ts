import { Component, input, Input, signal } from '@angular/core';
import { RegisterComponent } from "../account/register/register.component";
import { user } from '../../../types/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
 protected isRegistered = signal(false);

  register(value:boolean){
    this.isRegistered.set(value);
  }


}
