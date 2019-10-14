import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleDetail } from '../model/article';
import { CLIENT_RENEG_LIMIT } from 'tls';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url = 'https://conduit.productionready.io/api/articles';
  header = new HttpHeaders({
    Accept: 'application/json',
    Authorization: `Token ${localStorage.getItem('token')}`
  });
  tag;
  author;
  favorited;

  constructor(private http: HttpClient) { }

  // public getArticles(limit, offset, tag): Observable<any> {
  public getArticles(limit, offset, tag?): Observable<any> {
    return this.http.get(this.url,
      {
        params: {
          limit: limit,
          offset: offset,
          tag: tag
        },
      });
  }

  //get article with user
  public getArticlesWithLogin(limit, offset): Observable<any>{
    return this.http.get(this.url + '/feed',{
      params: {
        limit: limit,
        offset: offset
      },
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
  }

  // public getArticle(param): Observable<any>{
  //   return this.http.get(this.url + `/${param}`)
  // }
  articleDetail(slug: string) {
    return this.http.get(`${this.url}/${slug}`, {
      headers: this.header
    })
  }

  createArticle(value: ArticleDetail) {
    return this.http.post(this.url, { article: value }, {
      headers: this.header
    });
  }

  getCommnets(slug: string) {
    return this.http.get(`${this.url}/${slug}/comments`, {
      headers: this.header
    });
  }

  getArticleWithOtherUser(author: string, limit, offset){
    return this.http.get(this.url, {
      params:{
        author: author,
        limit: limit,
        offset: offset
      }
    });
  }

  getFavoritedArticles(favorited: string, limit, offset){
    return this.http.get(this.url, {
      params: {
        favorited: favorited,
        limit: limit,
        offset: offset
      }
    })
  }
}
