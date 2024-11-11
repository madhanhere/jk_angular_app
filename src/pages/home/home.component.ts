import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';

import { PostService as PostsService } from '../../api/post.service';
import { PostList } from '../../interface/post';
import { Router } from '@angular/router';
import { User } from '../../interface/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule
  ],
  providers: [HttpClientModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  postList!: PostList;
  showCreate: boolean = false;
  createPostForm: FormGroup = this.builder.group({});
  readonly panelOpenState = signal(false);
  profile!: User;

  constructor(
    private postsService: PostsService,
    private builder: FormBuilder,
    private router: Router,
  ) {
    this.profile = this.getProfile();
  }

  getProfile() {
    const user = localStorage.getItem("user");
    if (user === null) return null;
    return JSON.parse(user);
  }

  setupForm() {
    this.showCreate = true;
    this.createPostForm = this.builder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  create() {
    this.postsService
      .create(
        this.createPostForm.value.title,
        this.createPostForm.value.content
      )
      .subscribe((post) => {
        this.createPostForm.reset();
        this.showCreate = false;
        this.getList();
      });
  }

  onPageChange(change: PageEvent) {
    this.getList(change.pageIndex + 1, change.pageSize);
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(page: number = 1, limit: number = 5) {
    this.postsService.list(page, limit).subscribe((list: PostList) => {
      this.postList = list;
    });
  }

  goToPostDetailComp(id: string) {
    this.router.navigate(['/post/' + id])
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
