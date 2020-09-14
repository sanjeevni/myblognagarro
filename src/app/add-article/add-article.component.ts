import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Article } from '../models/article';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['../blog.css']
})
export class AddArticleComponent implements OnInit {

  articleData: Article = new Article();

  constructor(private _blog: BlogService,private _route : ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    const slugID = this._route.snapshot.paramMap.get('slug');
    this.fetchArticle(slugID);
  }

  fetchArticle(slugID : string){
    this._blog.getArticle(slugID).subscribe(
      res => {
        this.articleData = res["article"]
        console.log(this.articleData)
      },
      err => console.log(err)
    )
  }

  addArticle() {
    console.log(this.articleData);
    this._blog.addArticle(this.articleData)
      .subscribe(
        res => {
          // localStorage.setItem('token', res.token)
          this._router.navigate(['/article', res.article.slug]);
          console.log(res)

        },
        err => console.log(err)
      );
  }
  editArticle()
  {
    console.log(this.articleData);
    this._blog.editArticle(this.articleData)
      .subscribe(
        res => {
          // localStorage.setItem('token', res.token)
          this._router.navigate(['/article',res.article.slug]);
          console.log(res)
         
        },
        err => console.log(err)
      );
  }
}
