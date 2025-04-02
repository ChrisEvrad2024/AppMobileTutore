// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private _currentUser = new BehaviorSubject<any>(null);
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {
    this.initStorage();
    this.checkToken();
  }

  async initStorage() {
    await this.storage.create();
  }

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  get currentUser(): Observable<any> {
    return this._currentUser.asObservable();
  }

  async checkToken() {
    const token = await this.storage.get('token');
    if (token) {
      try {
        // Verify the token with the backend
        const response = await this.verifyToken(token).toPromise();
        if (response && response.valide) {
          const userData = await this.storage.get('user');
          this._currentUser.next(userData);
          this._isAuthenticated.next(true);
        } else {
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}${environment.endpoints.auth.login}`, 
      credentials
    ).pipe(
      tap(async (response) => {
        if (response && response.token) {
          await this.storage.set('token', response.token);
          await this.storage.set('user', {
            username: response.username,
            roles: response.roles
          });
          
          this._currentUser.next({
            username: response.username,
            roles: response.roles
          });
          this._isAuthenticated.next(true);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}${environment.endpoints.auth.register}`, 
      userData
    );
  }

  verifyToken(token: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}${environment.endpoints.auth.verifyToken}?token=${token}`
    );
  }

  async logout() {
    await this.storage.remove('token');
    await this.storage.remove('user');
    this._currentUser.next(null);
    this._isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  // Helper method to get the token for API requests
  async getToken(): Promise<string | null> {
    return await this.storage.get('token');
  }

  // Check if user has specific role
  async hasRole(role: string): Promise<boolean> {
    const user = await this.storage.get('user');
    if (user && user.roles) {
      return user.roles.includes(role);
    }
    return false;
  }
}