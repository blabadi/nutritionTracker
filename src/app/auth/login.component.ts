import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService } from "./auth-service";
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
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

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

        this.authenticationService.register(user)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                });
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.loginModel.username, this.loginModel.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                });
    }
}