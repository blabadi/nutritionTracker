import {Food} from './food';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Constants} from "../constants";
import {ServiceBase} from "../common/service-base";

@Injectable()
export class FoodService extends ServiceBase {
    private foodsUrl = Constants.API.SERVER_BASE + '/food/';
    constructor(private http: Http){
        super();
    }

    getFoods(): Promise<Food[]> {
        return this.http.get(this.foodsUrl+ "all", {headers: super.getDefaultHeaders()})
            .toPromise()
            .then(response => response.json().data as Food[])
            .catch(this.handleError);
    };

    searchFood(term:string):Observable<Food[]> {
        return this.http
            .get(`${this.foodsUrl}search?name=${term}`, {headers: super.getDefaultHeaders()})
            .map(response => response.json() as Food[]);
    }

    addFood(food:Food): Promise<Food> {
        return this.http
            .post(this.foodsUrl, JSON.stringify(food), {headers: super.getDefaultHeaders()})
            .toPromise()
            .then(res => res.json() as Food)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}