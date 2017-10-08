import { Component, OnInit, OnDestroy} from '@angular/core';
import {Food} from "../food/food";
import {EntryService} from "./entry-service";
import {Entry} from "./entry";
import { EventsService } from 'angular-event-service';
import {Constants} from "../constants";

@Component({
    selector: 'add-entry',
    templateUrl: './add-entry.component.html',
    styleUrls: ['./add-entry.component.css'],
    providers: [EntryService]
})
export class AddEntryComponent implements OnInit, OnDestroy {
    selectedFood:Food;
    showAddFoodForm: boolean;

    constructor(private _eventsService: EventsService){}

    ngOnInit(): void{
        this._eventsService.on(Constants.EVENTS.ADD_NEW_FOOD_SELECTED, this.setShowAddFoodForm);
        this._eventsService.on(Constants.EVENTS.FOOD_ADDED, this.setShowAddFoodForm);
        this._eventsService.on(Constants.EVENTS.ADD_FOOD_CANCELED, this.setShowAddFoodForm);
    }

    private setShowAddFoodForm: Function = (msg: any) => {
        this.showAddFoodForm = !this.showAddFoodForm;
    };

    onFoodSearchSelected(food:Food){
        console.debug('new food selected for entry');
        this.selectedFood = food;
    }

    entryAdded(entry:Entry) {
        console.log('emitted event received AddEntryComponent: entryAdded..');
    }

    ngOnDestroy() {
        this._eventsService.destroyListener(Constants.EVENTS.ADD_NEW_FOOD_SELECTED, this.setShowAddFoodForm);
    }
}