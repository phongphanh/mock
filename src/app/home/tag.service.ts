import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  url = 'https://conduit.productionready.io/api/tags';

  public getTags(): Observable<any>{
    return this.http.get(this.url);
  }
}
