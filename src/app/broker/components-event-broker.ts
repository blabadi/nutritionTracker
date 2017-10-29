import { Injectable } from '@angular/core';
import {Constants} from "../constants";

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
                return this.call(Constants.COMPONENTS.DAY_ENTRIES,'entries', {value: payload});
            case Constants.EVENTS.ADD_NEW_FOOD_SELECTED:
                return this.call(Constants.COMPONENTS.ADD_ENTRY, 'showAddFoodForm', {value: true});
            case Constants.EVENTS.ADD_FOOD_CANCELED:
                return this.call(Constants.COMPONENTS.ADD_ENTRY, 'showAddFoodForm', {value: false});
            case Constants.EVENTS.FOOD_ADDED:
                return this.call(Constants.COMPONENTS.ADD_ENTRY, 'showAddFoodForm', {value: false});
            case Constants.EVENTS.DATE_CHANGED:
                return this.call(Constants.COMPONENTS.DAY_ENTRIES, 'dateRange', {value: payload});
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