import {Food} from '../food/food';

export class Entry {
    id: number;
    //the food eaten
    food : Food;
    //the serving of that food multiplier
    amount: number;
    //date of entry
    createdAt: Date;
    //which meal
    meal: string;
}

