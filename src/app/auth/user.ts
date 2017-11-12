export class User {
    public name:string;
    public password:string;
    public roles:string[];

    constructor(usrename, password, roles) {
        this.name = usrename;
        this.password = password;
        this.roles = roles;
    };
}