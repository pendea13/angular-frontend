import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.baseUrl}/api/users`);
    }

    register(user: User) {
        return this.http.post(`${environment.baseUrl}/api/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.baseUrl}/api/user/delete/${id}`);
    }
    view(id: number) {
    return this.http.get<any>(`${environment.baseUrl}/api/user/view/${id}`);
    }
  update(id: number, userDetails) {
    return this.http.patch(`${environment.baseUrl}/api/user/update/${id}`, userDetails);
  }
  deleteUserRole(userId: number, roleId: number) {
    return this.http.delete(`${environment.baseUrl}/api/user/delete-role/${userId}/${roleId}`);
  }
}
