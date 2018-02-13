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
    public firstname:string;
    public lastname:string;
    public heightCm:number;
    public currentWeight:number;
    public targetWeight:number;
    public fatPercentage:number;
    public targets:{
        calories:number,
        fats:number,
        carbs:number,
        protein:number
    };
    constructor(){}
}