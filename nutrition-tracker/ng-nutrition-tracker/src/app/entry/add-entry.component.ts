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

    constructor(private entrySvc:EntryService){
    }

    addEntry(food:Food){
        let entry:Entry = new Entry();
        entry.createdAt = new Date();
        entry.food = new Food('a');

        this.entrySvc.addEntry(entry);
    }
}