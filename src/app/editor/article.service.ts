import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleDetail, Article } from '../model/article';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url = 'https://conduit.productionready.io/api/articles';
  header = localStorage.getItem('token') != undefined ? new HttpHeaders({
    Accept: 'application/json',
    Authorization: `Token ${localStorage.getItem('token')}`
  }) : new HttpHeaders({
    Accept: 'application/json',
  });

  constructor(private http: HttpClient, private authService: AuthService) { 
    authService.loginEmit.subscribe((data: string) => {
      this.header = data != undefined ? new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }) : new HttpHeaders({
        Accept: 'application/json',
      });
    })
  }

  //get all articles
  public getArticles(limit, offset, tag?): Observable<any> {
    return this.http.get(this.url,
      {
        params: {
          limit: limit,
          offset: offset,
          tag: tag
        },
        headers: this.header
      });
  }

  //get article with user - article feed
  public getArticlesWithLogin(limit, offset): Observable<any> {
    return this.http.get(this.url + '/feed', {
      params: {
        limit: limit,
        offset: offset
      },
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
  }

  //get article detail
  articleDetail(slug: string, isLogin: boolean) {
    let headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    });
    if (isLogin) {
      return this.http.get(`${this.url}/${slug}`, {
        headers: headers
      })
    } else {
      return this.http.get(`${this.url}/${slug}`);
    }
  }

  //create artile
  createArticle(value: Article) {
    return this.http.post(this.url, { article: value }, {
      headers: this.header
    });
  }

  //create artile
  editArticle(value: Article, slug: string) {
    return this.http.put(`${this.url}/${slug}`, { article: value }, {
      headers: this.header
    });
  }

  //get list comment of article
  getCommnets(slug: string, isLogin: boolean) {
    let headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    });
    if (isLogin) {
      return this.http.get(`${this.url}/${slug}/comments`, {
        headers: headers
      });
    } else {
      return this.http.get(`${this.url}/${slug}/comments`);
    }
  }

  //add comment author
  addComment(slug: string, body: string) {
    return this.http.post(`${this.url}/${slug}/comments`, {
      comment: {
        body: body
      }
    }, {
      headers: this.header
    });
  }

  //delete comment author
  delComment(slug: string, id: number) {
    return this.http.delete(`${this.url}/${slug}/comments/${id}`, {
      headers: this.header
    })
  }

  //like/dislike article
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

  getArticleWithOtherUser(author: string, limit, offset) {
    return this.http.get(this.url, {
      params: {
        author: author,
        limit: limit,
        offset: offset
      },
      headers: this.header
    });
  }

  getFavoritedArticles(favorited: string, limit, offset) {
    return this.http.get(this.url, {
      params: {
        favorited: favorited,
        limit: limit,
        offset: offset
      },
      headers:  this.header
    })
  }

  deleteArticle(slug: string) {
    return this.http.delete(`${this.url}/${slug}`,{
      headers: this.header
    })
  }
}
