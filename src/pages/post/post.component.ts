import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../../api/post.service';
import { Post } from '../../interface/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './post.component.html',
})
export class PostComponent {
  postId = this.route.snapshot.paramMap.get('id');
  post!: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {
    if (this.postId)
    this.postService.getPostDetail(this.postId).subscribe((post: Post) => { this.post = post })
  }
}
