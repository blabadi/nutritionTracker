import { Component, OnInit, OnDestroy} from '@angular/core';
import {Food} from "../food/food";
import {EntryService} from "./entry-service";
import {Entry} from "./entry";
import {Constants} from "../constants";
import {EventsBroker} from "../broker/components-event-broker";

@Component({
    selector: 'add-entry',
    templateUrl: './add-entry.component.html',
    styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit, OnDestroy {
    showAddFoodForm: boolean;
    constructor(private eventsBroker: EventsBroker){}
    ngOnInit(): void{
        this.eventsBroker.register({
            name: Constants.COMPONENTS.ADD_ENTRY,
            changeHandlers: {
                showAddFoodForm: this.setShowAddFoodForm,
            }
        });
    }

    private setShowAddFoodForm: Function = (msg: any) => {
        this.showAddFoodForm = msg.value;
    };

    ngOnDestroy() {
        this.eventsBroker.unregister(Constants.COMPONENTS.ADD_ENTRY);
    }
}