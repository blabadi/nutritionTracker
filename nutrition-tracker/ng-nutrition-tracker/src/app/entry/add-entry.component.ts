import { Component } from '@angular/core';
import {Food} from "../food/food";
import {EntryService} from "./entry-service";
import {Entry} from "./entry";

@Component({
    selector: 'add-entry',
    templateUrl: './add-entry.component.html',
    styleUrls: ['./add-entry.component.css'],
    providers: [EntryService]
})
export class AddEntryComponent {
    selectedFood:Food;

    onFoodSearchSelected(food:Food){
        this.selectedFood = food;
    }
}