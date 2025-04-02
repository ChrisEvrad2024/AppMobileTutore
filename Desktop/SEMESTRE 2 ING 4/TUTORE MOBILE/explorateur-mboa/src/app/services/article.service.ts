// src/app/services/article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Article {
  idArticle: number;
  titre: string;
  description: string;
  date_publication: string;
  photo: any;
  isEnabled: boolean;
  isDelete: boolean;
  certification: boolean;
  createur: string;
  modificateur: string;
  rubrique: any;
  transport: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticles(page = 0, size = 10, isEnabled?: boolean): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (isEnabled !== undefined) {
      params = params.set('isEnabled', isEnabled.toString());
    }

    return this.http.get<any>(
      `${environment.apiUrl}${environment.endpoints.articles.all}`,
      { params }
    );
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(
      `${environment.apiUrl}${environment.endpoints.articles.detail}`,
      { params: { id: id.toString() } }
    );
  }

  getCertifiedArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(
      `${environment.apiUrl}${environment.endpoints.articles.all}/certified`
    );
  }

  getActiveArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(
      `${environment.apiUrl}${environment.endpoints.articles.all}/active`
    );
  }

  createArticle(articleData: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('article', JSON.stringify(articleData));
    if (file) {
      formData.append('file', file);
    }

    return this.http.post<any>(
      `${environment.apiUrl}${environment.endpoints.articles.create}`,
      formData
    );
  }

  updateArticle(articleData: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('article', JSON.stringify(articleData));
    if (file) {
      formData.append('file', file);
    }

    return this.http.post<any>(
      `${environment.apiUrl}${environment.endpoints.articles.update}`,
      formData
    );
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}${environment.endpoints.articles.all}/deleteArticle`,
      null,
      { params: { id: id.toString() } }
    );
  }
}