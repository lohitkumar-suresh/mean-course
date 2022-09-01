import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
  }
  onAddPost(form: NgForm) {
    if(form.invalid){
      return;
    }
    const post = {
      id: '',
      title: form.value.title,
      content: form.value.content
    }
    this.postService.addPost(post.id, form.value.title, form.value.content);
    form.resetForm();
  }

}
