import { Injectable } from '@angular/core';
import {User} from "./user";

@Injectable()
export class UserStorage {
    public storeUser(user:User) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
    public getCurrentUser():User {
        let user =  JSON.parse(sessionStorage.getItem('currentUser'));
        return new User(user.name, user.password, user.roles);
    }
}