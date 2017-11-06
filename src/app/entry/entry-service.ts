import { Entry } from './entry';
import * as moment from 'moment';
import {Food} from '../food/food';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';
import {Constants} from "../constants";
import {PeriodMeasures} from "../day-progress-bars/period-measures";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Measurement} from "../day-progress-bars/measurement";
/**
 * the data store pattern: https://coryrylan.com/blog/angular-observable-data-services
 */
@Injectable()
export class EntryService {
    private entriesApiUrl = Constants.API.SERVER_BASE + "/entry/";//'api/entries';

    // the live stream of entries
    entries: Observable<Entry[]>;
    user:any;
    // will serve as the pipe that we notify our subscribers about changes in entries,
    // every time we change the entries this subject will be updated to invoke subscribers
    private entriesSubject: BehaviorSubject<Entry[]>;

    //the entries cache
    private dataStore: {
        entries: Entry[]
    };

    // Behaviour subject has to be initialized.
    constructor(private http:Http){
        let username: string = 'bashar';
        let password: string = 'password';
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.dataStore = { entries: [] };
        this.entriesSubject =  <BehaviorSubject<Entry[]>>new BehaviorSubject([]);
    }

    // this will be used by clients to get an observable reference to be notified with about
    // changes in our entries collection
    entriesObservable() {
        return this.entriesSubject.asObservable();
    }

    getEntries(start:moment.Moment, end:moment.Moment) {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append("Authorization", "Basic " + this.user.token);
        return this.http.get(this.entriesApiUrl + `/from/${start.format('YYYYMMDD')}/to/${end.format('YYYYMMDD')}`, {headers: headers})
            // map returns observable
            .map(response => response.json() as Entry[])
            .subscribe(entries => {
                this.dataStore.entries = entries;
                // we push the new values to our observers by using the next()
                // we copy the cache and not pass a reference to it, so the subs
                // can't damage it. basically Object.assign does a clone operation.
                this.entriesSubject.next(Object.assign({}, this.dataStore).entries)
            }, error => this.handleError(error));
    }

    edit(entry:Entry) {
        let id = entry.id;
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append("Authorization", "Basic " + this.user.token);
        return this.http
            .put(this.entriesApiUrl, JSON.stringify(entry), {headers: headers})
            .toPromise()
            //.then(res => res.json() as Entry)
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

    delete(id:String){
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append("Authorization", "Basic " + this.user.token);
        return this.http
            .delete(`${this.entriesApiUrl}${id}`, {headers: headers})
            .toPromise()
            //.then(res => res.json() as Entry)
            .then(() => {
                this.dataStore.entries.forEach((t, i) => {
                    if (t.id === id) { this.dataStore.entries.splice(i, 1); }
                });
                this.entriesSubject.next(Object.assign({}, this.dataStore).entries)
            }, error => this.handleError(error));
    }

    addEntry(entry:Entry): Promise<Entry> {
        entry.createdAt = new Date();
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append("Authorization", "Basic " + this.user.token);
        return this.http
            .post(this.entriesApiUrl, JSON.stringify(entry), {headers: headers})
            .toPromise()
            .then(res => res.json() as Entry)
            .then(e => {
                this.dataStore.entries.push(e);
                this.entriesSubject.next(Object.assign({}, this.dataStore).entries)
            }, error => this.handleError(error));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}