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
    // it's always a good idea to initialize the inputs
    // to a default reasonable value
    // in this case the date navigator is initialized before this component
    // so we should load something in the first hit.
    // another solution could be passing the default inputs from parents chain
    @Input()
    dateRange = {
        start: moment().startOf('day'),
        end: moment().startOf('day')
    };

    underEditEntryId: string;
    showUndoDelete:boolean = false;
    lastDeletedEntry:Entry;
    deleteTimeOut:any;
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

    undoDelete() {
        this.entryService.addEntry(this.lastDeletedEntry);
        this.showUndoDelete = false;
        //clear the time out otherwise if we delete another entity
        // within the timeout it will not be invoked earlier than 7 secs, causing the undo
        //option to disappear.
        clearTimeout(this.deleteTimeOut);
    }

    remove(entry:Entry) {
        this.entryService.remove(entry.id);
        this.showUndoDelete = true;
        this.deleteTimeOut = setTimeout(()=>{
            this.showUndoDelete = false;
            this.lastDeletedEntry = null;
        }, 7000);
        this.lastDeletedEntry = entry;
    }

    editMode(entry:Entry) {
        //stop any other edit mode first
        this.stopEdit();
        this.underEditEntryId = entry.id;
    }

    saveEdit(entry:Entry) {
        this.entryService.edit(entry);
        this.stopEdit();
    }

    stopEdit() {
        this.underEditEntryId = null;
    }

    isEditMode(id) {
        return this.underEditEntryId == id;
    }

    public dateChanged =  (msg: any) => {
        let range:any = msg.value;
        console.log('received new date range from evnt service : ',  range);
        this.dateRange ={
            start: range.start,
            end: range.end
        };
        this.getEntries();
    };

    ngOnDestroy() {
        this.eventsBroker.unregister( Constants.COMPONENTS.DAY_ENTRIES);
    }

}
