import { Entry } from './entry';
import {Food} from '../food/food';
import { Injectable } from '@angular/core';

@Injectable()
export class EntryService {
    getEntries(): Entry[] {
        let entries: Entry[] = [
            {
                food: new Food('eggs'),
                amount: 1.1,
                createdAt: new Date(),
                meal: 'BREAKFAST'
            }
        ];
        return entries;
    }

    addEntry(entry:Entry){

    }
}