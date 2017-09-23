import {Food} from "./food";
export class MockFoods {

    getMockData():Food[] {
        let food1:Food = new Food('eggs');
        food1.brand = "happyFarms";
        food1.servingUnit = "100 g";
        food1.id = 1;

        let food2:Food = new Food('Bread');
        food2.brand = "happyFarms";
        food2.servingUnit = "45 g";
        food2.id = 2;

        let food3:Food = new Food('Yougert');
        food3.brand = "happyFarms";
        food3.servingUnit = "125 g";
        food3.id = 3;

        const foods:Food[] = [
            food1, food3,food2
        ];

        return foods;
    }

}