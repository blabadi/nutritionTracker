import { Component, OnInit  } from '@angular/core';
import  {EntryService} from '../entry/entry-service'
import {Entry} from '../entry/entry';

@Component({
    selector: 'day-entries',
    templateUrl: './day-entries.component.html',
    styleUrls: ['./day-entries.component.css'],
    providers: [EntryService]
})
export class DayEntriesComponent implements OnInit {
    title = 'app';
    entries:Entry[];

    constructor(private entryService: EntryService) {

    };

    ngOnInit(): void {
        this.getEntries();
    }

    getEntries(){
        this.entryService.getEntries().then(e => this.entries = e);
    }

    entryAdded(entry:Entry){
        console.log('entry added detected.')
        this.getEntries();
    }
}
