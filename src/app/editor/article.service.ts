import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  url = 'https://conduit.productionready.io/api/articles';
  tag;
  author;
  favorited;

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
}
