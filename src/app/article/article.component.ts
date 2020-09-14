import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { Article } from '../models/article';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['../blog.css']
})
export class ArticleComponent implements OnInit {

  article = new Article();
  comments:  any[];
  comment = new Comment();

  constructor(private _blog : BlogService, private _route : ActivatedRoute, private _router: Router) {  }



  ngOnInit(): void {
    const slugID = this._route.snapshot.paramMap.get('slug');
    this.fetchArticle(slugID);
  }
  
  fetchArticle(slugID : string){
    this._blog.getArticle(slugID).subscribe(
      res => {
        this.article = res["article"]
        console.log(this.article)
        this.fetchComments(slugID)
      },
      err => console.log(err)
    )
  }

  fetchComments(slugID:string){
    this._blog.getComments(slugID).subscribe(
      res => {
        this.comments = res["comments"]
        console.log(this.comments)
      },
      err => console.log(err)
    )
  }

  deleteArticle()
  {
    console.log(this.article);
    this._blog.deleteArticle(this.article.slug)
      .subscribe(
        res => {
          // localStorage.setItem('token', res.token)
          this._router.navigate(['/home']);
          console.log(res)
         
        },
        err => console.log(err)
      );
  }

  editArticle(){
    this._router.navigate(['/add-article', this.article.slug]);
  }

  addComment()
  {
    console.log(this.comment);
    this._blog.addComment(this.article.slug, this.comment.body)
      .subscribe(
        res => {
          // localStorage.setItem('token', res.token)
          // this._router.navigate(['/article',this.article.slug]);
          console.log(res)
          this.fetchComments(this.article.slug)         
        },
        err => console.log(err)
      );
  }

  deleteComment(id: number)
  {
    console.log(this.article);
    this._blog.deleteComment(this.article.slug,id)
      .subscribe(
        res => {
          // localStorage.setItem('token', res.token)
          this._router.navigate(['/article',this.article.slug]);
          console.log(res)
          this.fetchComments(this.article.slug) 
        },
        err => console.log(err)
      );
  }

}
