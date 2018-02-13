
//had to run npm install --save angular-in-memory-web-api to be able to use this
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Food} from "./food/food";


export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const entries = [
            {
                id: '123',
                food: new Food('Organic Large Eggs', '1 Large'),
                amount: 1.1,
                createdAt: new Date(),
                meal: 'BREAKFAST'
            }
        ];


        let food1:Food = new Food('eggs');
        food1.brand = "happyFarms";
        food1.unit = "100 g";
        food1.id = '1';

        let food2:Food = new Food('Bread');
        food2.brand = "happyFarms";
        food2.unit = "45 g";
        food2.id = '2';

        let food3:Food = new Food('Yougert');
        food3.brand = "happyFarms";
        food3.unit = "125 g";
        food3.id = '3';

        const foods:Food[] = [
            food1, food3,food2
        ];

        return {entries: entries, foods: foods};
    }
}