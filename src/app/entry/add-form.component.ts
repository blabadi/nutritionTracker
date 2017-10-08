import { Component, Input, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {Food} from "../food/food";
import {EntryService} from "./entry-service";
import {Entry} from "./entry";
import { EventsService } from 'angular-event-service';
import { Constants } from "../constants"
@Component({
    selector: 'add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit, OnDestroy {

    @Input() food:Food;
    entry:Entry = new Entry();
    @Output() onEntryAdded = new EventEmitter<Entry>();

    constructor(private entrySvc:EntryService, private _eventsService:EventsService){}

    ngOnInit():void {
        this._eventsService.on(Constants.EVENTS.SEARCH_FOOD_SELECTED, this.foodSearchSelected)
    }

    private foodSearchSelected: Function = (msg : any) => {
        console.log('foodSearchSelected pinnged', msg);
        this.entry.food = msg;
    };

    addEntry(){
        this.entry.createdAt = new Date();
        this.entrySvc
            .addEntry(this.entry).then(entry => {
                console.debug('emitting Entry Added');
                this.onEntryAdded.emit(entry);
                console.debug('broadcasting entry added ');
                this._eventsService.broadcast(Constants.EVENTS.ENTRY_ADDED, entry);
            });
        this.entry.food = null;
    }

    ngOnDestroy(){
        this._eventsService.destroyListener(Constants.EVENTS.SEARCH_FOOD_SELECTED, this.foodSearchSelected)
    }
    cancel(){
        this.entry.food = null;
    }
}