import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Constants} from "../constants";
import {User} from "./user";
import {UserStorage} from "./user-storage";

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private userStorage:UserStorage) {}
    login(username: string, password: string) {
        let authToken = btoa(username + ":" + password);
        let headers:HttpHeaders = new HttpHeaders({"Authorization": "Basic " + authToken});
        return this.http.get(Constants.API.SERVER_BASE + '/user/authenticate',{headers})
            .map((response:User) => {
                let user = response;
                user.password = authToken;
                this.userStorage.storeUser(user);
                return user;
            });
    }

    register(user:User) {
        return this.http.post(Constants.API.SERVER_BASE + '/user/register', user)
            .map((response) => {
                let created = response as User;
                let authToken = btoa(user.name + ":" + user.password);
                user.password = authToken;
                this.userStorage.storeUser(user);
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }
}