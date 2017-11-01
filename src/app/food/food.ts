
export class Food {
    id : string;
    name : string;
    brand: string = null;
    imageUrl: string = null;
    unit: string;
    calories: number = 0;
    carbs: number = 0;
    fat: number = 0;
    protein: number = 0;

    constructor(name:string, servingUnit?:string) {
        this.name = name;
        this.unit = servingUnit;
    }
}
