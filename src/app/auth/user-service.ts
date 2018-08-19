import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Constants} from "../constants";
import {User, Profile} from "./user";
import {UserStorage} from "./user-storage";

@Injectable()
export class UserService {
    private userSubject: BehaviorSubject<User>;

    private dataStore:{
        user:User;
    };

    constructor(private http: HttpClient, private userStorage:UserStorage) {
        this.dataStore = {
            user: this.userStorage.getCurrentUser() || new User('', '', [])
        };

        this.userSubject =  <BehaviorSubject<User>>new BehaviorSubject(this.dataStore.user);
    }

    public getUserObservable():Observable<User> {
        return this.userSubject.asObservable();
    }

    login(username: string, password: string) {
        let authToken = btoa(username + ":" + password);
        let headers:HttpHeaders = new HttpHeaders({"Authorization": "Basic " + authToken});
        return this.http.get(Constants.API.SERVER_BASE + `/user/${username}`,{headers}).pipe(
            map((response:User) => {
                let user = response;
                user.password = authToken;
                this.userStorage.storeUser(user);
                this.dataStore.user = user;
                this.userSubject.next(Object.assign({}, this.dataStore).user);
                return user;
            })
        );
    }

    updateProfile(profile:Profile) {
        let user:User = this.userStorage.getCurrentUser();
        return this.http
            .put(Constants.API.SERVER_BASE + `/user/${user.name}/profile`, profile)
            .toPromise()
            .then(() => {
                this.dataStore.user.profile = profile;
                //its important that the user service to keep the userStorage up to date
                //as it will be used between page refreshs to fill the dataStore user
                // that is used in getCurrentUser()
                this.userStorage.storeUser(this.dataStore.user);
                this.userSubject.next(Object.assign({}, this.dataStore).user);
            }, error => this.handleError(error));
    }

    register(user:User) {
        return this.http.post(Constants.API.SERVER_BASE + '/user/', user).pipe(
            map((response) => {
                let created = response as User;
                created.password = btoa(user.name + ":" + user.password);;
                this.userStorage.storeUser(created);
                this.dataStore.user = created;
                this.userSubject.next(Object.assign({}, this.dataStore).user);
            }));
    }


    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
    }

    getCurrentUser(){
        return this.userStorage.getCurrentUser();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}