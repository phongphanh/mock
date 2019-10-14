import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleDetail } from '../model/article';

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

  addComment(slug: string, body: string) {
    return this.http.post(`${this.url}/${slug}/comments`, {
      comment: {
        body: body
      }
    }, {
      headers: this.header
    });
  }

  delComment(slug: string, id: number) {
    return this.http.delete(`${this.url}/${slug}/comments/${id}`, {
      headers: this.header
    })
  }

  favoriteArticle(status: boolean, slug: string) {
    let url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
    if (status) {
      return this.http.post(url, {}, {
        headers: this.header
      });
    } else {
      return this.http.delete(url, {
        headers: this.header
      });
    }
  }
}
