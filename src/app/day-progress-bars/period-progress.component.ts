import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import {PeriodMeasures} from "./period-measures";
import {EntryService} from "../entry/entry-service";
import { Observable } from 'rxjs/Observable';
import {Entry} from "../entry/entry";
import {Measurement} from "./measurement";
@Component({
    selector: 'period-measures',
    templateUrl: './period-measures.component.html',
    styleUrls: ['./period-measures.component.css']
})
export class PeriodProgressMeasureComponent implements OnInit {
    private periodValues: PeriodMeasures;

    @Input()
    entries: Entry[];

    constructor(private entrySvc:EntryService){}

    ngOnInit() {
        let periodMeasures = new PeriodMeasures();
        periodMeasures.carbs = new Measurement();
        periodMeasures.carbs.label = "Carbs";
        periodMeasures.carbs.target = 220;
        periodMeasures.carbs.value = 0;

        periodMeasures.fats = new Measurement();
        periodMeasures.fats.label = "Fats";
        periodMeasures.fats.target = 55;
        periodMeasures.fats.value = 0;

        periodMeasures.proteins = new Measurement();
        periodMeasures.proteins.label = "Proteins";
        periodMeasures.proteins.target = 150;
        periodMeasures.proteins.value = 0;

        periodMeasures.calories = new Measurement();
        periodMeasures.calories.label = "Calories";
        periodMeasures.calories.target = 2000;
        periodMeasures.calories.value = 0;
        this.periodValues = periodMeasures;

        // watch when the entries change and update the view accordingly.
        this.entrySvc.entriesObservable().subscribe(entries => {
            console.log('entries observed by PeriodProgressMeasureComponent');
            this.periodValues.calories.value = 0;
            this.periodValues.carbs.value = 0;
            this.periodValues.fats.value = 0;
            this.periodValues.proteins.value = 0;

            for (let i in entries) {
                this.periodValues.calories.value += entries[i].amount * entries[i].food.calories;
                this.periodValues.carbs.value += entries[i].amount * entries[i].food.carbs;
                this.periodValues.fats.value += entries[i].amount * entries[i].food.fat;
                this.periodValues.proteins.value += entries[i].amount * entries[i].food.protein;
            }
        });
        console.log('PeriodProgressMeasureComponent subscribed to entries');
    }
}