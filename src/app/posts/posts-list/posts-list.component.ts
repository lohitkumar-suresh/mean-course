import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSub: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getAllPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe(
      (posts) => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy(): void {
      this.postsSub.unsubscribe();
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  editPost() {

  }
}
