export class LoginInfoDto {
    Id: number;
    username: string;
    token: string;

    constructor( id: number, username: string, token: string ){
        this.Id = id;
        this.username = username;
        this.token = token;
        
    }
}