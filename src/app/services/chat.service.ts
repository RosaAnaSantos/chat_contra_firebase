import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Post} from '../modelos/task.interface';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private usersCollection: AngularFirestoreCollection<Post>;
  private posts: Observable<Post[]>;
  constructor(db: AngularFirestore) {
    this.usersCollection = db.collection<Post>('todos');
    this.posts = this.usersCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
   }

   getPosts(){
     return this.posts;
   }

   getPost(id: string){
     return this.usersCollection.doc<Post> (id).valueChanges();
   }

   updatePost(post:Post, id:string){
     return this.usersCollection.doc(id).update(post);
   }

   addPost(post: Post){
     return this.usersCollection.add(post);

   }

   removePost(id:string){
     return this.usersCollection.doc(id).delete();
   }
}
