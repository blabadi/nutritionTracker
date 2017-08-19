import { Component, Input } from '@angular/core';
import {Food} from "../food/food";
import {EntryService} from "./entry-service";
import {Entry} from "./entry";

@Component({
    selector: 'add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.css'],
    providers: [EntryService]
})
export class AddFormComponent {

    @Input() food:Food;

    constructor(private entrySvc:EntryService){
    }

    addEntry(food:Food, amount:number){
        let entry:Entry = new Entry();
        entry.createdAt = new Date();
        entry.food = new Food('a');
        entry.amount = amount;
        this.entrySvc.addEntry(entry);
    }
}