import { Headers, Http } from '@angular/http';

export class ServiceBase {
    getDefaultHeaders():Headers {
        let headers = new Headers({'Content-Type': 'application/json'});
        let user = JSON.parse(sessionStorage.getItem('currentUser'));
        headers.append("Authorization", "Basic " + user.token);
        return headers;
    }
}