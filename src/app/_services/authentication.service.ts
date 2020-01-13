import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
      const body = {
        grant_type: 'password',
        client_id: 3,
        client_secret: 'Et3nGUkTCd5EqQi2uQlFxgLlfRqFkdPiVTJ9uOWy',
        scope: '*',
        username,
        password
      };
      const headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin', '*');
      return this.http.post<any>(`${environment.baseUrl}/oauth/token`, body, { headers })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    getUserDetail() {
      return this.http.get<User>(`${environment.baseUrl}/api/user`);
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
