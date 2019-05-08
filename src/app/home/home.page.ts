import { Component, OnInit } from '@angular/core';
import {User} from '../modelos/task.interface';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  usuarios:User[];
  constructor(private chatService:ChatService){

  }

  ngOnInit(){
  this.chatService.getUsers().subscribe(res => 
   // console.log('Usuarios', res);
             this.usuarios=res
  );

  }
}
