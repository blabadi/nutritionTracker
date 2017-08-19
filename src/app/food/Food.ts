
export class Food {
    id : number;
    name : string;
    brand: string = null;
    imageUrl: string = null;

    servingSize: number;
    servingUnit: string;
    nutritionInfo: NutritionInfo = null;

    constructor(name:string) {
        this.name = name;
    }
}

export class NutritionInfo {
    calories: number;
    carbs: number;
    fat: number;
    protein: number;

    constructor(calories:number, carbs:number, fat:number, protein: number){
        this.calories = calories;
        this.carbs = carbs;
        this.fat = fat;
        this.protein = protein;
    }
}