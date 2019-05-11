import { Component, OnInit } from '@angular/core';
import {User} from '../modelos/task.interface';
import {ChatService} from '../services/chat.service';
import {AuthService} from '../servicios/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  usuarios:User[];
  constructor(private chatService:ChatService, public authservice: AuthService){

  }

  ngOnInit(){
  this.chatService.getUsers().subscribe(res => 
   // console.log('Usuarios', res);
             this.usuarios=res
  );

  }

  Onlogout(){
   this.authservice.logout();
  }
}
