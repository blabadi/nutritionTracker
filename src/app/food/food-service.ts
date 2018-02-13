import {Food} from './food';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Constants} from "../constants";


@Injectable()
export class FoodService {
    private foodsUrl = Constants.API.SERVER_BASE + '/food/';
    constructor(private httpClient: HttpClient){
    }

    getFoods(): Promise<Food[]> {
        return this.httpClient.get(this.foodsUrl+ "all")
            .toPromise()
            .then(response => response as Food[])
            .catch(this.handleError);
    };

    searchFood(term:string):Observable<Food[]> {
        return this.httpClient
            .get(`${this.foodsUrl}search?name=${term}`)
            .map(response => response as Food[]);
    }

    addFood(food:Food): Promise<Food> {
        return this.httpClient
            .post(this.foodsUrl, food)
            .toPromise()
            .then(res => res as Food)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}