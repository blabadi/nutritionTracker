import {Food} from './food';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class FoodService {
    private foodsUrl =
        //'api/foods';
        'http://localhost:8080/food/';
    private user;
    constructor(private http: Http){
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    }

    getFoods(): Promise<Food[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append("Authorization", "Basic " + this.user.token);
        return this.http.get(this.foodsUrl+ "all", {headers: headers})
            .toPromise()
            .then(response => response.json().data as Food[])
            .catch(this.handleError);
    };

    searchFood(term:string):Observable<Food[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append("Authorization", "Basic " + this.user.token);
        return this.http
            .get(`${this.foodsUrl}search?name=${term}`, {headers: headers})
            .map(response => response.json() as Food[]);
    }

    addFood(food:Food): Promise<Food> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append("Authorization", "Basic " + this.user.token);
        return this.http
            .post(this.foodsUrl, JSON.stringify(food), {headers: headers})
            .toPromise()
            .then(res => res.json() as Food)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}