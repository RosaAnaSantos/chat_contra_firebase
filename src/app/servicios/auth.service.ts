import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth, private router: Router) { }


  login(email:string, password:string){
    this.AFauth.auth.signInWithEmailAndPassword(email, password).then(res =>{
      console.log('Estás logeado:' + res)
      this.router.navigate(['/home']);
    }).catch(err => console.log('error Esto no va bien no estás logeado???:' + err));
  
  }
  logout(){
    this.AFauth.auth.signOut().then( () => {
      this.router.navigate(['/login']);
    })
  }
}






