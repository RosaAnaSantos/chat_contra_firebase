import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

   mensaje=false;
   email:string;
   password:string;
   constructor(private authService: AuthService) { }

  ngOnInit() {
  }
 
  isAuth(){
      return this.authService.isAutenticated();
  }
 
  enviarLogin(){
    console.log('Estás en la función');
    this.authService.login(this.email, this.password);
    setTimeout(() => {
      if(this.isAuth() === false){
        this.mensaje=true;
      }
    }, 2000);
  }

  onClickFunction(event) {
    this.mensaje = false;
  } 
}
