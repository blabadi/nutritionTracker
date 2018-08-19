import { Entry } from './entry';
import * as moment from 'moment';
import {Food} from '../food/food';
import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Constants} from "../constants";
import {PeriodMeasures} from "../day-progress-bars/period-measures";
import { Observable, of ,  BehaviorSubject } from 'rxjs';
import {Measurement} from "../day-progress-bars/measurement";

/**
 * the data store pattern: https://coryrylan.com/blog/angular-observable-data-services
 */
@Injectable()
export class EntryService {
    private entriesApiUrl = Constants.API.SERVER_BASE + "/entry/";

    // the live stream of entries
    //entries: Observable<Entry[]>;

    // will serve as the pipe that we notify our subscribers about changes in entries,
    // every time we change the entries this subject will be updated to invoke subscribers
    private entriesSubject: BehaviorSubject<Entry[]>;

    //the entries cache
    private dataStore: {
        entries: Entry[]
    };

    // Behaviour subject has to be initialized.
    constructor(private httpClient:HttpClient){
        this.dataStore = { entries: [] };
        this.entriesSubject =  <BehaviorSubject<Entry[]>>new BehaviorSubject([]);
    }

    // this will be used by clients to get an observable reference to be notified with about
    // changes in our entries collection
    entriesObservable() {
        return this.entriesSubject.asObservable();
    }

    getEntries(start:moment.Moment, end:moment.Moment) {
        return this.httpClient
            .get<Entry[]>(this.entriesApiUrl + `/from/${start.format('YYYYMMDD')}/to/${end.format('YYYYMMDD')}`)
            // map returns observable
            .subscribe(entries => {
                this.dataStore.entries = entries;
                // we push the new values to our observers by using the next()
                // we copy the cache and not pass a reference to it, so the subs
                // can't damage it. basically Object. assign does a clone operation.
                this.entriesSubject.next(Object.assign({}, this.dataStore).entries)
            }, error => this.handleError(error));
    }

    edit(entry:Entry) {
        let id = entry.id;
        return this.httpClient
            .put(this.entriesApiUrl, entry)
            .toPromise()
            .then(() => {
                this.dataStore.entries.forEach((e, i) => {
                    if (e.id === id) {
                        console.log('e ', e, 'entry ', entry);
                        this.dataStore.entries[i] = entry;
                    }
                });
                this.entriesSubject.next(Object.assign({}, this.dataStore).entries)
            }, error => this.handleError(error));
    }

    remove(id:String){
        return this.httpClient
            .delete(`${this.entriesApiUrl}${id}`)
            .toPromise()
            .then(() => {
                this.dataStore.entries.forEach((t, i) => {
                    if (t.id === id) { this.dataStore.entries.splice(i, 1); }
                });
                this.entriesSubject.next(Object.assign({}, this.dataStore).entries)
            }, error => this.handleError(error));
    }

    addEntry(entry:Entry): Promise<Entry> {
        return this.httpClient
            .post(this.entriesApiUrl, entry)
            .toPromise()
            .then((e:Entry) => {
                this.dataStore.entries.push(e);
                this.entriesSubject.next(Object.assign({}, this.dataStore).entries)
            }, error => this.handleError(error));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}