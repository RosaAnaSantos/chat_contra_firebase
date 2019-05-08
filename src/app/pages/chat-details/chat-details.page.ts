import { Component, OnInit } from '@angular/core';
import {User} from '../../modelos/task.interface';
import {ChatService} from '../../services/chat.service';
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.page.html',
  styleUrls: ['./chat-details.page.scss'],
})
export class ChatDetailsPage implements OnInit {
 usuario:User={
  name:'',
  comentario:'',
  urlFoto:''
 };
 usuarioId=null;
  constructor( private route:ActivatedRoute, private nav:NavController,
               private chatService:ChatService, private loadingController:LoadingController) { 

  }

  ngOnInit() {
    this.usuarioId = this.route.snapshot.params['id'];
    if(this.usuarioId){
      this.loadUsuario();
    }
  }
  async loadUsuario(){
    const loading=await this.loadingController.create({
      message: 'Loading.....'
    });

    this.chatService.getUser(this.usuarioId).subscribe(res => {
      loading.dismiss();
      this.usuario = res;
    })
 }

 async guardarUsuario(){
  const loading=await this.loadingController.create({
    message: 'Saving.....'
  });
  await loading.present();
  if(this.usuarioId){
     this.chatService.updateUser(this.usuario, this.usuarioId).then(() =>{
       loading.dismiss();
       this.nav.navigateForward('/');
     });
  }else{
    this.chatService.addUser(this.usuario).then(() =>{
      loading.dismiss();
      this.nav.navigateForward('/');
    });
  }
 }
 eliminarUsuario(idUsuario:string){
this.chatService.removeUser(idUsuario);
 }
}
