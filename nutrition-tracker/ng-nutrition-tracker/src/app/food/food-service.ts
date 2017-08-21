import {Food} from './food';
import { Injectable } from '@angular/core';
import {MockFoods} from "./mock-foods";
import { Observable }     from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class FoodService {
    private foodsUrl = 'api/foods';
    constructor(private http: Http){}

    getFoods(): Promise<Food[]> {
        //return new MockFoods().getMockData();
        return this.http.get(this.foodsUrl)
            .toPromise()
            .then(response => response.json().data as Food[])
            .catch(this.handleError);
    };

    searchFood(term:string):Observable<Food[]> {
        return this.http
            .get(`${this.foodsUrl}?name=${term}`)
            .map(response => response.json().data as Food[]);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}