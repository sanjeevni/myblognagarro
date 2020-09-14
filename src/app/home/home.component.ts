import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../blog.service';
import { map } from 'rxjs/operators';
import { Article } from '../models/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../blog.css']
})
export class HomeComponent implements OnInit {

  articles: any[];

  constructor(private _blog : BlogService, private _router : Router) {  }



  ngOnInit(): void {
    this.getGlobalArticles();
  }

  navArticle(slug:string){
    this._router.navigate(['/article',slug]);
  }

  getGlobalArticles(){    
    this._blog.globalArticles() 
    .subscribe(
      res => {
        this.articles = res["articles"]
        console.log(this.articles)
      },
      err => console.log(err)
    )
  }

}
