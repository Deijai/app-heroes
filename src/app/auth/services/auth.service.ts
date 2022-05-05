import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';

const url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth: Auth | undefined;

  //methods gets
  get getAuth(): Auth {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) {}

  signin(): Observable<Auth> {
    return this.http.get<Auth>(`${url}/usuarios/1`).pipe(
      tap((auth) => (this._auth = auth)),
      tap((auth) =>
        localStorage.setItem('token', JSON.stringify(this._auth?.id))
      )
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    return this.http.get<Auth>(`${url}/usuarios/1`).pipe(
      map((auth) => {
        this._auth = auth;
          return true
      })
    );
  }
}
