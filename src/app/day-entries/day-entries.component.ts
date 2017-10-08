import { Component, OnInit, OnDestroy  } from '@angular/core';
import  {EntryService} from '../entry/entry-service'
import {Entry} from '../entry/entry';

import { EventsService } from 'angular-event-service';
import {Constants} from "../constants"

@Component({
    selector: 'day-entries',
    templateUrl: './day-entries.component.html',
    styleUrls: ['./day-entries.component.css'],
    providers: [EntryService]
})
export class DayEntriesComponent implements OnInit, OnDestroy {

    entries:Entry[];

    constructor(private entryService: EntryService, private _eventsService:EventsService) {};

    ngOnInit(): void {
        console.log('on init day entries in');
        this.getEntries();
        this._eventsService.on(Constants.EVENTS.ENTRY_ADDED, this.callbackListener);
    }

    getEntries(){
        this.entryService.getEntries().then(e => this.entries = e);
    }

    private callbackListener: Function = (msg: any) => {
        let entry:Entry = <Entry> msg.args;
        console.log('received from evnt service : ' ,  entry);
        this.entryAdded(entry);
    };

    entryAdded(entry:Entry){
        console.log('entry added detected.')
        this.getEntries();
    }

    ngOnDestroy() {
        this._eventsService.destroyListener(Constants.EVENTS.ENTRY_ADDED, this.callbackListener);
    }

}
