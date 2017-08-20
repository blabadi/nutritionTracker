import { Entry } from './entry';
import {Food} from '../food/food';
import { Injectable } from '@angular/core';

@Injectable()
export class EntryService {
    entries: Entry[] =[
        {
            food: new Food('eggs'),
            amount: 1.1,
            createdAt: new Date(),
            meal: 'BREAKFAST'
        }
    ];

    getEntries(): Entry[] {
        return this.entries;
    }

    addEntry(entry:Entry){
        entry.createdAt = new Date();
        this.entries.push(entry);
    }
}