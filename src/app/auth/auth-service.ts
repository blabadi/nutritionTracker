import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Constants} from "../constants";

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) { }
    login(username: string, password: string) {
        let authToken = btoa(username + ":" + password);
        let headers:Headers = new Headers({"Authorization": "Basic " + authToken});
        return this.http.get(Constants.API.SERVER_BASE + '/user/authenticate', {headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                user.token = authToken;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }
}