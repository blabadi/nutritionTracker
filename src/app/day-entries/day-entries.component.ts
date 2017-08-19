import { Component } from '@angular/core';
import  {EntryService} from '../entry/entry-service'
import {Entry} from '../entry/entry';

@Component({
    selector: 'day-entries',
    templateUrl: './day-entries.component.html',
    styleUrls: ['./day-entries.component.css'],
    providers: [EntryService]
})
export class DayEntriesComponent {
    title = 'app';
    entries:Entry[];

    constructor(private entryService: EntryService) { };
    ngOnInit(): void {
        this.entries = this.entryService.getEntries();
    }

}
