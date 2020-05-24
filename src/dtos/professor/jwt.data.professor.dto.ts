export class JwtDataProfessorDto {
    professorId: number;
    username: string;
    exp: number; // unix timestemp
    ip: string;
    userAgent: string; 

    toPlainObj() {
        return {
            professorId: this.professorId,
            username: this.username, 
            exp: this.exp,
            ip: this.ip,
            userAgent: this.userAgent
        }
    }
}