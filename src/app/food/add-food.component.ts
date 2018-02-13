import {Component, OnInit} from '@angular/core'
import {Food} from './food'
import {FoodService} from "./food-service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Constants} from '../constants'
import {EventsBroker} from "../broker/components-event-broker";
@Component({
    selector: 'add-food',
    templateUrl: 'add-food.component.html',
    styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {
    food = new Food(null);
    constructor(private eventSvc: EventsBroker, private foodSvc:FoodService) {}

    ngOnInit() {
    }

    addFood() {
        this.foodSvc
            .addFood(this.food)
            .then(food => {
                this.eventSvc.broadcast({topic: Constants.EVENTS.FOOD_ADDED, data: food});
                console.log('food added.');
            });
    }

    cancel(){
        this.eventSvc.broadcast({topic: Constants.EVENTS.ADD_FOOD_CANCELED});
    }
}