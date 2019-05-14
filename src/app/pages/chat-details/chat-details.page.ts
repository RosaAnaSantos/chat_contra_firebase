import { Component, OnInit } from '@angular/core';
import {User} from '../../modelos/task.interface';
import {ChatService} from '../../services/chat.service';
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

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
 oculto:boolean=false;
 mostrar:boolean=true;
 usuarioId=null;
  constructor(private storage:AngularFireStorage, private route:ActivatedRoute, private nav:NavController,
               private chatService:ChatService, private loadingController:LoadingController) { 
  }

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;



onUpload(e){
//console.log('subir', e.target.files[0]);
const id=Math.random().toString(36).substring(2);
const file =e.target.files[0];
const filePath = 'uploads/profile_' + id;
const ref= this.storage.ref(filePath);
const task =this.storage.upload(filePath, file);
this.uploadPercent = task.percentageChanges();
task.snapshotChanges().pipe(finalize(() =>this.urlImage = ref.getDownloadURL())).subscribe();
}

  ngOnInit() {
    this.usuarioId = this.route.snapshot.params['id'];
    if(this.usuarioId){
      this.loadUsuario();
      this.mostrar=false;
    }else{
     this.oculto=true;
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
