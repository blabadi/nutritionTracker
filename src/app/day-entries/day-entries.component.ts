import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import  {EntryService} from '../entry/entry-service'
import {Entry} from '../entry/entry';
import * as moment from 'moment';
import {Constants} from "../constants"
import {EventsBroker} from "../broker/components-event-broker";
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'day-entries',
    templateUrl: './day-entries.component.html',
    styleUrls: ['./day-entries.component.css']
})
export class DayEntriesComponent implements OnInit, OnDestroy {
    @Input()
    entries:Entry[] = [];
    // because we don't control the order of initialization
    // it's always a good idea to intialize the inputs
    // to a default reasonable value
    // in this case the date navigator is initalized before this component
    // so we should load something in the first hit.
    // another solution could be passing the default inputs from parents chain
    @Input()
    dateRange = {
        start: moment().startOf('day'),
        end: moment().startOf('day')
    };

    constructor(private entryService: EntryService,
                private eventsBroker:EventsBroker) {};

    ngOnInit(): void {

        //subscribe for the entries changes
        this.entryService.entriesObservable().subscribe(entries => {
            this.entries = entries.sort((e1, e2)=> {
                return e1.createdAt < e2.createdAt ? 1: -1;
            });
        });
        console.log('on init day entries in');
        this.eventsBroker.register({
            name: Constants.COMPONENTS.DAY_ENTRIES,
            changeHandlers: {
                //no longer needed, since we observe the entities in the entry-service
                //entries: this.callbackListener,
                dateRange: this.dateChanged
            }
        });
        this.getEntries();
    }

    getEntries(){
        this.entryService.getEntries(this.dateRange.start, this.dateRange.end);
    }

    //public callbackListener: Function = (msg: any) => {
    //    let entry:Entry = <Entry> msg.value;
    //    console.log('received from evnt service : ' ,  entry);
    //    this.entryAdded(entry);
    //};

    public dateChanged =  (msg: any) => {
        let range:any = msg.value;
        console.log('received new date range from evnt service : ',  range);
        this.dateRange ={
            start: range.start,
            end: range.end
        };
        this.getEntries();
    };

    //entryAdded(entry:Entry){
    //    console.log('entry added detected.');
    //    this.getEntries();
    //}

    ngOnDestroy() {
        this.eventsBroker.unregister( Constants.COMPONENTS.DAY_ENTRIES);
    }

}
