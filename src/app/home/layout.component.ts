import { Component } from '@angular/core';
import {UserStorage} from "../auth/user-storage";
import {UserService} from "../auth/user-service";
import {User} from "../auth/user";

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls : ['./layout.component.css']
})
export class LoggedInLayoutComponent {
    currentUser:User;
    constructor(private userSvc:UserService){};
    ngOnInit(){
        this.userSvc.getUserObservable().subscribe(u => {
            this.currentUser = u;
        });
    }
}