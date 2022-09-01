import { Post } from './../posts/post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  endPointUrl = 'http://localhost:3000/api/posts';
  private posts: Post [] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  addPost(id: string, title: string, content: string) {
    const post = {id: id, title: title, content: content};
    this.http.post<{message: string, postId: string}>(this.endPointUrl, post).subscribe(
      (responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getAllPosts() {
    this.http.get<{message: string, posts: any}>(this.endPointUrl).pipe(
      map((postData) => {
        return postData.posts.map(post => {
          return {
            id: post._id,
            title: post.title,
            content: post.title
          }
        })
      })
    ).subscribe(
      (transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      }
    );
  }

  deletePost(postId: string) {
    this.http.delete(this.endPointUrl + '/'+ postId).subscribe(
      () => {
        const remainingPosts = this.posts.filter( el => el.id !== postId);
        this.posts = remainingPosts;
        this.postsUpdated.next([...this.posts]);
      }
    );
  }
}
