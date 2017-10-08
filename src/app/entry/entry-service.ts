import { Entry } from './entry';
import {Food} from '../food/food';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';
import {Constants} from "../constants";


@Injectable()
export class EntryService {

    private entriesApiUrl = Constants.API.SERVER_BASE + "/entry/";//'api/entries';

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http:Http){}

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