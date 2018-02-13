import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Measurement} from "./measurement";

@Component({
    selector: 'progress-measure',
    templateUrl: './progress-measure.component.html',
    styleUrls: ['./progress-measure.component.css']
})
export class ProgressMeasureComponent {
    @Input()
    private measure: Measurement;

    constructor(){}


    getMeasurePercentage(){
        return this.measure.value / this.measure.target * 100
    }

}