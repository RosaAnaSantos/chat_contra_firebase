import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../modelos/task.interface';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  constructor(db: AngularFirestore) {
    this.usersCollection = db.collection<User>('todos');
    this.users = this.usersCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
   }

   getUsers(){
     return this.users;
   }

   getUser(id: string){
     return this.usersCollection.doc<User> (id).valueChanges();
   }

   updateUser(usuario:User, id:string){
     return this.usersCollection.doc(id).update(usuario);
   }

   addUser(usuario: User){
     return this.usersCollection.add(usuario);

   }

   removeUser(id:string){
     return this.usersCollection.doc(id).delete();
   }
}
