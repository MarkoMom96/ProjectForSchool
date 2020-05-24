export class LoginInfoProfessorDto {
    professorId: number;
    username: string;
    token: string;

    constructor( professorId: number, username: string, token: string ){
        this.professorId = professorId;
        this.username = username;
        this.token = token;
        
    }
}