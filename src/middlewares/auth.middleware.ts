import { NestMiddleware, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NextObserver } from "rxjs";
import { NextFunction, Request, Response } from "express";
import { ProfessorService } from "src/services/professor/professor.service";
import * as jwt from "jsonwebtoken";
import { JwtDataProfessorDto } from "src/dtos/professor/jwt.data.professor.dto";
import { jtwSecret } from "config/jtw.secter";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly professorService: ProfessorService){}
    async use(req: Request, res: Response, next: NextFunction) {

        if(!req.headers.authorization) {
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }
        const token = req.headers.authorization;

        const tokenParts = token.split(' ');
        if(tokenParts.length !== 2){
            throw new HttpException('Bad token found 1 (length)',HttpStatus.UNAUTHORIZED);
        }
        const tokenString = tokenParts[1];

        let jwtData: JwtDataProfessorDto;
         try {
            jwtData =  jwt.verify(tokenString, jtwSecret);
         } 
         catch (error) {
            throw new HttpException('Bad token found 2',HttpStatus.UNAUTHORIZED);
         }
         if(!jwtData){
            throw new HttpException('Bad token found 3 ',HttpStatus.UNAUTHORIZED);
         }

        if (jwtData.ip !== req.ip.toString()) {
            throw new HttpException('Bad token found( ip )',HttpStatus.UNAUTHORIZED);  
        }
        if (jwtData.userAgent !== req.header["user-agent"]) {
            throw new HttpException('Bad token found( ua )',HttpStatus.UNAUTHORIZED);  
        }

        const professor = await this.professorService.getById(jwtData.professorId);
        if (!professor){
            throw new HttpException('Account not found',HttpStatus.UNAUTHORIZED);  
        }

        const currentTimeStamp = new Date().getTime() / 1000;
        if(currentTimeStamp >= jwtData.exp) {
            throw new HttpException('The token has expired',HttpStatus.UNAUTHORIZED);  

        }
        next();
    }

}