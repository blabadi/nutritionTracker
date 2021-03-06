import { Component, EventEmitter, Output, OnInit, HostListener, ViewChild,ElementRef  } from '@angular/core';

import {Food} from "../food/food";
import { Observable ,  Subject }        from 'rxjs';

// Observable class extensions


// Observable operators

import {
    debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
 
import {FoodService} from "../food/food-service";


import {Constants} from "../constants";
import {TitleCasePipe} from "../pipes/title-case-pipe";
import {EventsBroker} from "../broker/components-event-broker";

@Component({
    selector: 'search-food',
    templateUrl: './search-food.component.html',
    styleUrls: ['./search-food.component.css']
})
export class SearchFoodComponent implements OnInit {
    foods:Observable<Food[]>;
    selectedFood: Food;
    @ViewChild('searchBox')
    searchBox;
    @Output() onFoodSearchSelected = new EventEmitter<Food>();

    private searchTerms = new Subject<string>();

    constructor(private foodService:FoodService, private evntsBroker:EventsBroker, private _eref: ElementRef){
    }

    ngOnInit(): void{
        this.foods = this.searchTerms.pipe(
            debounceTime(300),        // wait 300ms after each keystroke before considering the term
            distinctUntilChanged(),   // ignore if next search term is same as previous
            switchMap(term => this.foodService.searchFood(term))
        );
    }

    //this is a handler to close the search list if it loses focus.
    @HostListener('document:click', ['$event'])
    onDocumentClick(e:MouseEvent){
        console.log('clicked document:' + e.target);
        if (!this._eref.nativeElement.contains(e.target)) {
            this.searchBox.nativeElement.value = ''
        }
    }

    search(text:string) {
        this.searchTerms.next(text);
    }

    setSelected(food:Food){
        console.debug('food selected from search');
        this.selectedFood = food;
        this.onFoodSearchSelected.emit(this.selectedFood);
        this.evntsBroker.broadcast({topic: Constants.EVENTS.SEARCH_FOOD_SELECTED, data: food});
        console.debug('food search set selected done');
    }

    addNewFood() {
        this.evntsBroker.broadcast({topic: Constants.EVENTS.ADD_NEW_FOOD_SELECTED});
    }

}