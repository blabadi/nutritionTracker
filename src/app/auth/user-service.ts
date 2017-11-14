import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Constants} from "../constants";
import {User, Profile} from "./user";
import {UserStorage} from "./user-storage";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
    private userSubject: BehaviorSubject<User>;

    private dataStore:{
        user:User;
    };

    constructor(private http: HttpClient, private userStorage:UserStorage) {
        this.dataStore = {
            user: new User('', '', [])
        };

        this.userSubject =  <BehaviorSubject<User>>new BehaviorSubject({});
    }


    public getUserObservable(){
        return this.userSubject.asObservable();
    }

    login(username: string, password: string) {
        let authToken = btoa(username + ":" + password);
        let headers:HttpHeaders = new HttpHeaders({"Authorization": "Basic " + authToken});
        return this.http.get(Constants.API.SERVER_BASE + `/user/${username}`,{headers})
            .map((response:User) => {
                let user = response;
                user.password = authToken;
                this.userStorage.storeUser(user);
                this.dataStore.user = user;
                this.userSubject.next(Object.assign({}, this.dataStore).user);
                return user;
            });
    }

    updateProfile(profile:Profile) {
        let user:User = this.userStorage.getCurrentUser();
        return this.http
            .put(Constants.API.SERVER_BASE + `/user/${user.name}/profile`, profile)
            .toPromise()
            .then(() => {
                this.dataStore.user.profile = profile;
                this.userSubject.next(Object.assign({}, this.dataStore).user);
            }, error => this.handleError(error));
    }

    register(user:User) {
        return this.http.post(Constants.API.SERVER_BASE + '/user/', user)
            .map((response) => {
                let created = response as User;
                let authToken = btoa(user.name + ":" + user.password);
                created.password = authToken;
                this.userStorage.storeUser(created);
                this.dataStore.user = created;
                this.userSubject.next(Object.assign({}, this.dataStore).user);
            });
    }


    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}