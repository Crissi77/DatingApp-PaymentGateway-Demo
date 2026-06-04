import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

  @Input() PlayerName!:string;



}
