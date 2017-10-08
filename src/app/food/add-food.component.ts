import {Component, OnInit} from '@angular/core'
import { EventsService } from 'angular-event-service';
import {Food} from './food'
import {FoodService} from "./food-service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Constants} from '../constants'
@Component({
    selector: 'add-food',
    templateUrl: 'add-food.component.html',
    providers: [FoodService]
})
export class AddFoodComponent implements OnInit {

    food = new Food(null);
    constructor(private eventSvc: EventsService, private foodSvc:FoodService) {}

    ngOnInit() {
    }

    addFood() {
        this.foodSvc.addFood(this.food)
            .then(food => {
                this.eventSvc.broadcast(Constants.EVENTS.FOOD_ADDED, food);
                console.log('food added.');
            });
    }
    cancel(){
        this.eventSvc.broadcast(Constants.EVENTS.ADD_FOOD_CANCELED);
    }
}