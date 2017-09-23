import { Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Food} from "../food/food";
import {EntryService} from "./entry-service";
import {Entry} from "./entry";

@Component({
    selector: 'add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.css'],
    providers: [EntryService]
})
export class AddFormComponent implements OnInit {

    @Input() food:Food;

    entry:Entry = new Entry();

    @Output() onEntryAdded = new EventEmitter<Entry>();

    constructor(private entrySvc:EntryService){
    }

    ngOnInit():void {
        this.entry.food = this.food;
    }

    addEntry(){
        this.entry.createdAt = new Date();
        this.entrySvc
            .addEntry(this.entry).then(entry => {
                console.log('emitting Entry Added');
                this.onEntryAdded.emit(entry)
            });
        this.food = null;
    }


    cancel(){
        this.food = null;
    }
}