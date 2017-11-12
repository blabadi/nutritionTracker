import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import {AuthenticationService} from "./auth-service";
import {Constants} from "../constants";
import {UserStorage} from "./user-storage";

/**
 * Angular 4.3 HttpClient provides ability to inject http requests interceptors
 * see:
 * https://angular.io/guide/http#intercepting-all-requests-or-responses
 * https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
 */
@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
    private noAuthUrls:string[] = [
        Constants.API.SERVER_BASE + '/user/register',
        Constants.API.SERVER_BASE + '/user/authenticate'
    ];
    constructor(
        private userStorage:UserStorage
        // couldn't inject this service to get current user, because that caused a cyclic dependency
        // since auth service depends on httpclient and this http client interceptor depends on auth service.
        // keeping this commented here to remember.
        //private auth: AuthenticationService
    ) {}
    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('in intercept');
        //skip no auth requests
        if (this.noAuthUrls.includes(req.url)) {
            return next.handle(req);
        }
        console.log('in intercept2');
        //append request header
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Basic ' + this.userStorage.getCurrentUser().password)
        });
        console.log('in intercept3');
        return next.handle(authReq);
    }
}