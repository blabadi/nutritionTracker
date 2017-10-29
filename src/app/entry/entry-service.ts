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
    private headers = new Headers({'Content-Type': 'application/json'});

    // the live stream of entries
    entries: Observable<Entry[]>;

    // will serve as the pipe that we notify our subscribers about changes in entries,
    // every time we change the entries this subject will be updated to invoke subscribers
    private entriesSubject: BehaviorSubject<Entry[]>;

    //the entries cache
    private dataStore: {
        entries: Entry[]
    };

    // Behaviour subject has to be initialized.
    constructor(private http:Http){
        this.dataStore = { entries: [] };
        this.entriesSubject =  <BehaviorSubject<Entry[]>>new BehaviorSubject([]);
    }

    // this will be used by clients to get an observable reference to be notified with about
    // changes in our entries collection
    entriesObservable() {
        return this.entriesSubject.asObservable();
    }

    getPeriodTotals(startDate:Date, endDate?:Date): PeriodMeasures {
        let periodMeasures = new PeriodMeasures();
        periodMeasures.carbs = new Measurement();
        periodMeasures.carbs.label = "Carbs";
        periodMeasures.carbs.target = 220;
        periodMeasures.carbs.value = 80;

        periodMeasures.fats = new Measurement();
        periodMeasures.fats.label = "Fats";
        periodMeasures.fats.target = 56;
        periodMeasures.fats.value = 15;

        periodMeasures.proteins = new Measurement();
        periodMeasures.proteins.label = "Proteins";
        periodMeasures.proteins.target = 150;
        periodMeasures.proteins.value = 73;

        periodMeasures.calories = new Measurement();
        periodMeasures.calories.label = "Calories";
        periodMeasures.calories.target = 1900;
        periodMeasures.calories.value = 1124;

        periodMeasures.startDate = startDate;
        periodMeasures.endDate = endDate;
        return periodMeasures;
    }

    getEntries(start:moment.Moment, end:moment.Moment) {
        return this.http.get(this.entriesApiUrl + `/from/${start.format('YYYYMMDD')}/to/${end.format('YYYYMMDD')}` )
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

    addEntry(entry:Entry): Promise<Entry> {
        entry.createdAt = new Date();
        return this.http
            .post(this.entriesApiUrl, JSON.stringify(entry), {headers: this.headers})
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