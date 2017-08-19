import {Food} from "./food";
export class MockFoods {

    getMockData():Food[] {
        let food1:Food = new Food('eggs');
        food1.brand = "happyFarms";
        food1.id = 1;

        const foods:Food[] = [
            food1
        ];

        return foods;
    }

}