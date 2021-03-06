import { Component, Input, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {Food} from "../food/food";
import {EntryService} from "./entry-service";
import {Entry} from "./entry";
import { Constants } from "../constants"
import {EventsBroker} from "../broker/components-event-broker";

@Component({
    selector: 'add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit, OnDestroy {
    entry:Entry = new Entry();
    @Input()
    food:Food;
    @Output()
    onEntryAdded = new EventEmitter<Entry>();
    @Input()
    entryDate:Date;

    constructor(private entrySvc:EntryService,
                private _eventBroker:EventsBroker){}

    ngOnInit():void {
        this._eventBroker.register({
            name: Constants.COMPONENTS.ADD_ENTRY_FORM,
            changeHandlers: {
                food: this.foodChanged,
                entryDate: (msg)=> {
                    console.log('date changed for add form ', msg);
                    this.entryDate = msg.value;
                }
            }
        });
    }

    public foodChanged: Function = (msg : any) => {
        console.log('food changed pinnged', msg);
        this.entry.food = msg.value;
    };

    addEntry(){
        this.entry.createdAt = this.entryDate || new Date();
        this.entrySvc
            .addEntry(this.entry)
            .then(entry => {
                console.debug('emitting Entry Added');
                this.onEntryAdded.emit(entry);
                console.debug('broadcasting entry added ');
                this._eventBroker.broadcast({topic: Constants.EVENTS.ENTRY_ADDED, data: entry});
                this.entry.amount = null;
                this.entry.food = null;
            });
    }

    ngOnDestroy(){
        this._eventBroker.unregister(Constants.COMPONENTS.ADD_ENTRY_FORM);
    }

    cancel(){
        this.entry.food = null;
    }
}