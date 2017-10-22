import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import {PeriodMeasures} from "./period-measures";
import {EntryService} from "../entry/entry-service";

@Component({
    selector: 'period-measures',
    templateUrl: './period-measures.component.html',
    styleUrls: ['./period-measures.component.css']
})
export class PeriodProgressMeasureComponent implements OnInit {
    private periodValues: PeriodMeasures;

    @Input()
    private startDate:Date;
    @Input()
    private endDate:Date;

    constructor(private entrySvc:EntryService){}

    ngOnInit() {
        this.periodValues = this.entrySvc.getPeriodTotals(new Date());
    }
}