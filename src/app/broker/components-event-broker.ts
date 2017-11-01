import { Injectable } from '@angular/core';
import {Constants} from "../constants";
import * as moment from 'moment';

@Injectable()
export class EventsBroker {
    private componentsListeners:any = {};

    public register(registration:Registration):void {
        this.componentsListeners[registration.name] = {
            changeHandlers : registration.changeHandlers
        }
    }

    public unregister(component:string) {
        delete this.componentsListeners[component];
    }

    public broadcast(msg:any){
        this.onEvent(msg.topic, msg.data);
    }

    onEvent(event:String, payload:any) {
        switch (event) {
            case Constants.EVENTS.SEARCH_FOOD_SELECTED:
                this.call(Constants.COMPONENTS.ADD_ENTRY_FORM, 'food', {value: payload});
                this.call(Constants.COMPONENTS.ADD_ENTRY, 'showAddFoodForm', {value: false});
            case Constants.EVENTS.ENTRY_ADDED:
            //  not needed anymore since we use observables to observe changes on the entries
            //  when we add an entry, so no need to publish this even to Day entries component.
            //    return this.call(Constants.COMPONENTS.DAY_ENTRIES,'entries', {value: payload});
                break;
            case Constants.EVENTS.ADD_NEW_FOOD_SELECTED:
                return this.call(Constants.COMPONENTS.ADD_ENTRY, 'showAddFoodForm', {value: true});
            case Constants.EVENTS.ADD_FOOD_CANCELED:
                return this.call(Constants.COMPONENTS.ADD_ENTRY, 'showAddFoodForm', {value: false});
            case Constants.EVENTS.FOOD_ADDED:
                return this.call(Constants.COMPONENTS.ADD_ENTRY, 'showAddFoodForm', {value: false});
            case Constants.EVENTS.DATE_CHANGED:
                this.call(Constants.COMPONENTS.DAY_ENTRIES, 'dateRange', {value: payload});
                let entryDate = (<moment.Moment> payload.start).toDate();
                this.call(Constants.COMPONENTS.ADD_ENTRY_FORM, 'entryDate', {value: entryDate})
                break;
            default:
                console.log('event handlers not mapped.');
        }
    }

    call(component, property, data) {
        if (!this.componentsListeners[component]) {
            console.log('component : ', component, 'is unregistered.. skipping');
            return false;
        }
        this.componentsListeners[component].changeHandlers[property](data);
    }
}

export interface Registration {
    name: string;
    changeHandlers:{[property:string]:Function;};
}