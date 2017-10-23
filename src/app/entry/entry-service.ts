import { Entry } from './entry';
import {Food} from '../food/food';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';
import {Constants} from "../constants";
import {PeriodMeasures} from "../day-progress-bars/period-measures";
import {Measurement} from "../day-progress-bars/measurement";

@Injectable()
export class EntryService {

    private entriesApiUrl = Constants.API.SERVER_BASE + "/entry/";//'api/entries';

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http:Http){}

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

    getEntries(): Promise<Entry[]> {
        return this.http.get(this.entriesApiUrl)
            .toPromise()
            .then(response => response.json() as Entry[])
            .catch(this.handleError);
    }

    addEntry(entry:Entry): Promise<Entry>{
        entry.createdAt = new Date();
        return this.http
            .post(this.entriesApiUrl, JSON.stringify(entry), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Entry)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}