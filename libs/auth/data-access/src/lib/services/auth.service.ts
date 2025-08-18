import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@lib/auth/domain';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', { email, password });
  }

  getUser(): Observable<User> {
    return this.http.get<User>('/api/user');
  }

  register(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/register', { email, password });
  }
}
