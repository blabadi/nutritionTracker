import { Component, OnInit, OnDestroy  } from '@angular/core';
import  {EntryService} from '../entry/entry-service'
import {Entry} from '../entry/entry';

import {Constants} from "../constants"
import {EventsBroker} from "../broker/components-event-broker";

@Component({
    selector: 'day-entries',
    templateUrl: './day-entries.component.html',
    styleUrls: ['./day-entries.component.css']
})
export class DayEntriesComponent implements OnInit, OnDestroy {
    entries:Entry[];
    constructor(private entryService: EntryService,
                private eventsBroker:EventsBroker) {};

    ngOnInit(): void {
        console.log('on init day entries in');
        this.getEntries();
        this.eventsBroker.register({
            name: Constants.COMPONENTS.DAY_ENTRIES,
            changeHandlers: {
                entries: this.callbackListener
            }
        });
    }

    getEntries(){
        return this.entryService.getEntries().then(e => this.entries = e.sort((e1, e2)=> {
           return e1.createdAt < e2.createdAt ? 1: -1;
        }));
    }

    public callbackListener: Function = (msg: any) => {
        let entry:Entry = <Entry> msg.value;
        console.log('received from evnt service : ' ,  entry);
        this.entryAdded(entry);
    };

    entryAdded(entry:Entry){
        console.log('entry added detected.')
        this.getEntries();
    }

    ngOnDestroy() {
        this.eventsBroker.unregister( Constants.COMPONENTS.DAY_ENTRIES);
    }

}
