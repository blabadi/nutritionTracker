import { Injectable } from '@angular/core';
import {User} from "./user";

@Injectable()
export class UserStorage {
    public storeUser(user:User) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
    public getCurrentUser():User {
        let user =  JSON.parse(sessionStorage.getItem('currentUser'));
        return user as User;
        //return new User(user.name, user.password, user.roles);
    }
}