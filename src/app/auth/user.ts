export class User {
    public name:string;
    public email:string;
    public password:string;
    public roles:string[];
    public  profile:Profile;

    constructor(usrename, password, roles) {
        this.name = usrename;
        this.password = password;
        this.roles = roles;
    };

}

export class Profile {
    get firstname():string {
        return this._firstname;
    }

    set firstname(value:string) {
        this._firstname = value;
    }

    get lastname():string {
        return this._lastname;
    }

    set lastname(value:string) {
        this._lastname = value;
    }

    get heightCm():number {
        return this._heightCm;
    }

    set heightCm(value:number) {
        this._heightCm = value;
    }

    get weight():number {
        return this._weight;
    }

    set weight(value:number) {
        this._weight = value;
    }

    get fatPercentage():number {
        return this._fatPercentage;
    }

    set fatPercentage(value:number) {
        this._fatPercentage = value;
    }

    get targets():{calories: number, fats: number, carbs: number, protein: number} {
        return this._targets;
    }

    set targets(value:{calories: number, fats: number, carbs: number, protein: number}) {
        this._targets = value;
    }
    private _firstname:string;
    private _lastname:string;
    private _heightCm:number;
    private _weight:number;
    private _fatPercentage:number;
    private _targets:{
        calories:number,
        fats:number,
        carbs:number,
        protein:number
    }


}