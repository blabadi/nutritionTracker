import {Food} from './food';
import { Injectable } from '@angular/core';
import {MockFoods} from "./mock-foods";
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class FoodService {
    getFood():Food[] {
        return new MockFoods().getMockData();
    };

    searchFood(term:string):Observable<Food[]> {
        return  Observable.of(new MockFoods().getMockData());
    }
}