import { Component, OnInit, OnDestroy  } from '@angular/core';
import  {EntryService} from '../entry/entry-service'
import {Entry} from '../entry/entry';
import * as moment from 'moment';
import {Constants} from "../constants"
import {EventsBroker} from "../broker/components-event-broker";

@Component({
    selector: 'date-nav',
    templateUrl: './date-navigator.component.html',
    styleUrls: ['./date-navigator.component.css']
})
export class DateNavigatorComponent implements OnInit {
    dateText:string;
    start: moment.Moment;
    end:moment.Moment;

    constructor(private eventsBroker:EventsBroker) {};

    ngOnInit(){
        this.start = moment().startOf('day');
        this.end = moment().endOf('day');
        this.formatDate(this.end);
        this.eventsBroker.broadcast({
            topic: Constants.EVENTS.DATE_CHANGED,
            data: {
                start: this.start,
                end: this.end
            }
        })
    }

    formatDate(moment) {
        let formats = {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: '[on] DD/MM/YYYY'
        };
        this.dateText = moment.calendar(null, formats);
    }

    goBack() {
        this.end = this.start;
        this.start = this.start.subtract(24, 'hours');
        this.formatDate(this.end);
        this.eventsBroker.broadcast({
            topic: Constants.EVENTS.DATE_CHANGED,
            data: {
                start: this.start,
                end: this.end
            }
        });

    }

    goForward() {
        this.end = this.start;
        this.start = this.start.add(24, 'hours');
        this.formatDate(this.end);
        this.eventsBroker.broadcast({
            topic: Constants.EVENTS.DATE_CHANGED,
            data: {
                start: this.start,
                end: this.end
            }
        });
    }
}
