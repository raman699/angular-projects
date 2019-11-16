import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../app/post.model';
import {PostsService } from  '../app/post.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
   this.postsService.createAndStorePosts(postData.title,postData.content);
  }

  onFetchPosts() {
    // Send Http request
   this.fetchPosts();
  }

  fetchPosts(){
    this.isFetching=true;
    this.postsService.fetchPosts().subscribe(posts =>{
      this.isFetching=false;
      this.loadedPosts = posts;
    } , error => {
         this.error = error.message;
         console.log(error);
    }
    );

  }
  onClearPosts() {
    // Send Http request
    this.postsService.deletePost().subscribe( () => {
      this.loadedPosts = [];
    })
  }

}
