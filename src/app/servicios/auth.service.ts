import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
nombre:string;

  constructor(private AFauth : AngularFireAuth, private router: Router, private db: AngularFirestore) { }


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

  isAutenticated(){
    const user= firebase.auth().currentUser;
    if(user){
      return true;
    }else{
      return false;
    }
  
  }

  registro(email : string, password : string, name : string){

    return new Promise ((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
          // console.log(res.user.uid);
        const uid = res.user.uid;
          this.db.collection('users').doc(uid).set({
            name : name,
            uid : uid
          })
        
        resolve(res)
      }).catch( err => reject(err))
    })
    

  }

}







