import { Controller, Post, Param, Body, Req } from "@nestjs/common";
import { ProfessorService } from "src/services/professor/professor.service";
import { LoginProfessorDto } from "src/dtos/professor/login.porfessor.dto";
import { ApiResponse } from "../misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInfoProfessorDto } from "src/dtos/professor/login.info.professor";
import * as jwt from "jsonwebtoken";
import { JwtDataProfessorDto } from "src/dtos/professor/jwt.data.professor.dto";
import { Request } from "express";
import { jtwSecret } from "config/jtw.secter";

@Controller('auth/')
export class AuthController {
    constructor(public professorService: ProfessorService) {  }

    @Post('login') // localhost:3000/auth/login
    async doLogin(@Body() data: LoginProfessorDto, @Req() req: Request): Promise<LoginInfoProfessorDto | ApiResponse> {
        const professor = await this.professorService.getByUsername(data.username);
        if (!professor) {
            return new Promise(resolve =>
                 resolve(new ApiResponse('error',-3001, "Information u entered is incorrect")))
        }
        const passwordHash = crypto.createHash('sha512'); 
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

        if (professor.passwordHash !== passwordHashString) {
            return new Promise(resolve =>
                resolve(new ApiResponse('error',-3002, "Information u entered is incorrect")))
        }

        const thisMoment = new Date;
        thisMoment.setDate(thisMoment.getDate() + 64);
        const expTimestamp = thisMoment.getTime() / 1000;
         
        const jwtData: JwtDataProfessorDto = new JwtDataProfessorDto();
        jwtData.professorId = professor.professorId;
        jwtData.username = professor.surname; 
        jwtData.exp = expTimestamp;
        jwtData.ip = req.ip.toString();
        jwtData.userAgent = req.header["user-agent"];

        const token: string = jwt.sign(jwtData.toPlainObj(), jtwSecret ); 

        const responseObj = new LoginInfoProfessorDto(
            professor.professorId,
            professor.username,
            token
        )
        return new Promise( resolve => resolve(responseObj));
        

    }


}