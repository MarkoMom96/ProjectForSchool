export class JwtDataDto {
    role: "student" | "professor";
    Id: number;
    username: string;
    exp: number; // unix timestemp
    ip: string;
    userAgent: string; 

    toPlainObj() {
        return {
            role: this.role,
            professorId: this.Id,
            username: this.username, 
            exp: this.exp,
            ip: this.ip,
            userAgent: this.userAgent
        }
    }
}