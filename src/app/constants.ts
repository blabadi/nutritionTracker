import { environment } from "../environments/environment";

export class Constants {
    public static  EVENTS = {
        ENTRY_ADDED: 'entry-added',
        SEARCH_FOOD_SELECTED: 'search-food-selected',
        ADD_NEW_FOOD_SELECTED: 'add-new-selected',
        FOOD_ADDED: 'food-added',
        ADD_FOOD_CANCELED: 'add-food-canceled',
        DATE_CHANGED: 'date-changed'
    };

    public static COMPONENTS = {
        ADD_ENTRY_FORM: 'add-form',
        DAY_ENTRIES: 'day-entries',
        ADD_ENTRY: 'add-entry'
    };

    public static API = {
        SERVER_BASE : environment.SERVER_URL
    }
}