import { Component, EventEmitter, Output } from '@angular/core';

import {Food} from "../food/food";
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {FoodService} from "../food/food-service";

@Component({
    selector: 'search-food',
    templateUrl: './search-food.component.html',
    styleUrls: ['./search-food.component.css'],
    providers: [FoodService]
})
export class SearchFoodComponent {
    foods:Observable<Food[]>;
    selectedFood: Food;

    @Output() onFoodSearchSelected = new EventEmitter<Food>();

    private searchTerms = new Subject<string>();

    constructor(private foodService:FoodService){
    }

    ngOnInit(): void{
        this.foods = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.foodService.searchFood(term)
                // or the observable of empty heroes if there was no search term
                : Observable.of<Food[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.error(error);
                return Observable.of<Food[]>([]);
            });
    }

    search(text:string) {
        this.searchTerms.next(text);
    }

    setSelected(food:Food){
        this.selectedFood = food;
        this.onFoodSearchSelected.emit(this.selectedFood);
        this.foods = Observable.of<Food[]>([]);
    }

}