import { Component, OnInit } from '@angular/core';
import {UserStorage} from "../auth/user-storage";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentUser:any;

    constructor(private userStorage:UserStorage){};

    ngOnInit(){
        this.currentUser = this.userStorage.getCurrentUser();
    }
}
