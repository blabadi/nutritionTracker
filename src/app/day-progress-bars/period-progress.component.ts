import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import {PeriodMeasures} from "./period-measures";
import {EntryService} from "../entry/entry-service";
import { Observable } from 'rxjs/Observable';
import {Entry} from "../entry/entry";
import {Measurement} from "./measurement";
import {UserService} from "../auth/user-service";
@Component({
    selector: 'period-measures',
    templateUrl: './period-measures.component.html',
    styleUrls: ['./period-measures.component.css']
})
export class PeriodProgressMeasureComponent implements OnInit {
    private periodValues: PeriodMeasures;

    @Input()
    entries: Entry[];

    constructor(private entrySvc:EntryService, private userSvc: UserService){}

    ngOnInit() {
        let profile = this.userSvc.getCurrentUser().profile;
        let periodMeasures = new PeriodMeasures();
        periodMeasures.carbs = new Measurement("Carbs", 0, profile.targets.carbs);
        periodMeasures.fats = new Measurement("Fats", 0,  profile.targets.fats);
        periodMeasures.proteins = new Measurement("Proteins", 0,  profile.targets.protein);
        periodMeasures.calories = new Measurement("Calories", 0,  profile.targets.calories);

        this.periodValues = periodMeasures;

        // watch when the entries change and update the view accordingly.
        this.entrySvc.entriesObservable().subscribe(entries => {
            console.log('entries observed by PeriodProgressMeasureComponent');
            this.periodValues.calories.value = 0;
            this.periodValues.carbs.value = 0;
            this.periodValues.fats.value = 0;
            this.periodValues.proteins.value = 0;

            for (let i in entries) {
                this.periodValues.calories.value += Math.round(entries[i].amount * entries[i].food.calories);
                this.periodValues.carbs.value += Math.round(entries[i].amount * entries[i].food.carbs);
                this.periodValues.fats.value += Math.round(entries[i].amount * entries[i].food.fat);
                this.periodValues.proteins.value += Math.round(entries[i].amount * entries[i].food.protein);
            }
        });
        console.log('PeriodProgressMeasureComponent subscribed to entries');
    }
}