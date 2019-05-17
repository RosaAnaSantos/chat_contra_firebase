import { Component, OnInit } from '@angular/core';
import {Post} from '../modelos/task.interface';
import {ChatService} from '../services/chat.service';
import {AuthService} from '../services_registro/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  posts:Post[];
  constructor(private chatService:ChatService, public authservice: AuthService){

  }

  ngOnInit(){
  this.chatService.getPosts().subscribe(res => 
   // console.log('Posts', res);
             this.posts=res
  );

  }

  Onlogout(){
   this.authservice.logout();
  }
  darNombre(){
    return name;
  }
}
