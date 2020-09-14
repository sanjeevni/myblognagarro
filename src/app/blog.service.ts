
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './models/article';
import { map } from 'rxjs/operators';
import { Comment } from './models/comment';
import { AuthService } from './auth.service';

@Injectable()
export class BlogService {

    private _url = "https://conduit.productionready.io/api";


    //jsonHeader = {headers: new HttpHeaders({'Content-Type':  'application/json'})};

    constructor(private http: HttpClient, private authService: AuthService) { }

    globalArticles(): Observable<any[]> {
        return this.http.get<any[]>(this._url + '/articles');
    }

    getArticle(slug: string): Observable<any> {
        return this.http.get<any>(this._url + '/articles/' + slug);
    }

    getComments(slug: string): Observable<any[]> {
        return this.http.get<any[]>(this._url + '/articles/' + slug + '/comments');
    }

    addArticle(article: Article): Observable<any> {
        const articlejson = {
            "article": {
              "title": article.title,
              "description": article.description,
              "body": article.body,
              "tagList": article.tagList
            }
          }
        const headers = new HttpHeaders()
            .set('Authorization', 'Token ' + this.authService.getToken());
        return this.http.post<any>(this._url + '/articles', articlejson,{ 'headers': headers });
    }

    editArticle(article: Article): Observable<any> {
        const articlejson = {
            article
        }
        const headers = new HttpHeaders()
            .set('Authorization', 'Token ' + this.authService.getToken());
        return this.http.put<any>(this._url + '/articles/' + article.slug, articlejson,{ 'headers': headers });
    }

    deleteArticle(slug: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', 'Token ' + this.authService.getToken());
        return this.http.delete(this._url + '/articles/' + slug,{ 'headers': headers });
    }

    addComment(slug: string, body: string): Observable<any> {
        const jsonPost = {
            "comment": {
                "body": body
            }
        }
        const headers = new HttpHeaders()
            .set('Authorization', 'Token ' + this.authService.getToken());
        return this.http.post<any>(this._url + '/articles/' + slug + '/comments', jsonPost, { 'headers': headers });
    }

    deleteComment(slug: string, id: number): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', 'Token ' + this.authService.getToken());
        return this.http.delete(this._url + '/articles/' + slug + '/comments/' + id, { 'headers': headers });
    }
}

