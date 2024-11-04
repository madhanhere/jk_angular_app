import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post, PostList } from '../interface/post';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  list(page: number, limit: number): Observable<PostList> {
    return this.http.get(`${environment.apiUrl}/posts?limit=${limit || 5}&page=${page||1}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).pipe(map(res => res as PostList))
  }

  create(title: string, content: string): Observable<Post> {
    return this.http.post(`${environment.apiUrl}/posts/create`, {
      title, content
    }, { headers: { Authorization: `Bearer ` + localStorage.getItem('token')}}).pipe(
      map(res => res as Post)
    )
  }

  getPostDetail(pId: string): Observable<Post> {
    return this.http.get(`${environment.apiUrl}/posts/${pId}`).pipe(
      map(res => res as Post)
    );
  }
}
