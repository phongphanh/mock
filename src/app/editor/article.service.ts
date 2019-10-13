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

  // public getArticle(param): Observable<any>{
  //   return this.http.get(this.url + `/${param}`)
  // }
  articleDetail(slug: string) {
    return this.http.get(`${this.url}/${slug}`, {
      headers: this.header
    })
  }

  createArticle(value: ArticleDetail) {
    value['tagList'] = value['tagList'].split(' ');
    return this.http.post(this.url, { article: value }, {
      headers: this.header
    });
  }
}
