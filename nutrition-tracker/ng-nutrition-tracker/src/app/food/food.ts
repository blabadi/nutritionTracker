
export class Food {
    id : number;
    name : string;
    brand: string = null;
    imageUrl: string = null;
    servingUnit: string;
    nutritionInfo: NutritionInfo = null;

    constructor(name:string, servingUnit?:string) {
        this.name = name;
        this.servingUnit = servingUnit;
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