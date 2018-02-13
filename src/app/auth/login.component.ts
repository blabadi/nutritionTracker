import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService } from "./user-service";
import {User} from "./user";
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    loginModel: any = {};
    registerModel:any = {};
    loading = false;
    rloading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
        // reset login status
        this.userService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    register() {
        this.rloading = true;
        let user:User = new User(
            this.registerModel.username,
            this.registerModel.password,
            this.registerModel.email
        );

        this.userService.register(user)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.rloading = false;
                });
    }

    login() {
        this.loading = true;
        this.userService.login(this.loginModel.username, this.loginModel.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                });
    }
}