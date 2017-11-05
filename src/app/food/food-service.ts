import {Food} from './food';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class FoodService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private foodsUrl =
        //'api/foods';
        'http://localhost:8080/food/';
    constructor(private http: Http){
        let username: string = 'bashar';
        let password: string = 'password';
        this.headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    }

    getFoods(): Promise<Food[]> {
        //return new MockFoods().getMockData();
        return this.http.get(this.foodsUrl+ "all", {headers: this.headers})
            .toPromise()
            .then(response => response.json().data as Food[])
            .catch(this.handleError);
    };

    searchFood(term:string):Observable<Food[]> {
        return this.http
            .get(`${this.foodsUrl}search?name=${term}`, {headers: this.headers})
            .map(response => response.json() as Food[]);
    }

    addFood(food:Food): Promise<Food> {
        return this.http
            .post(this.foodsUrl, JSON.stringify(food), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Food)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}