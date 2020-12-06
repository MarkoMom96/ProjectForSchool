import { Controller, Post, Param, Body, Req } from "@nestjs/common";
import { ProfessorService } from "src/services/professor/professor.service";
import { StudentService } from "src/services/student/student.service";
import { LoginDto } from "src/dtos/auth/login.dto";
import { ApiResponse } from "../misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInfoDto } from "src/dtos/auth/login.info";
import * as jwt from "jsonwebtoken";
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { Request } from "express";
import { jtwSecret } from "config/jtw.secter";
import { Student } from "src/entities/student.entity";

@Controller('auth/')
export class AuthController {
    constructor(
        public studentService: StudentService,
        public professorService: ProfessorService) {  }

    @Post('professor/login') // localhost:3000/auth/professor/login
    async doProfessorLogin(@Body() data: LoginDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {
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
         
        const jwtData: JwtDataDto = new JwtDataDto();
        jwtData.role = "professor";
        jwtData.Id = professor.professorId;
        jwtData.username = professor.surname;

        jwtData.exp = expTimestamp;
        jwtData.ip = req.ip.toString();
        jwtData.userAgent = req.header["user-agent"];

        const token: string = jwt.sign(jwtData.toPlainObj(), jtwSecret ); 

        const responseObj = new LoginInfoDto(
            professor.professorId,
            professor.username,
            token
        )
        return new Promise( resolve => resolve(responseObj));
        

    }

    @Post('student/login') // localhost:3000/auth/student/login
    async doStudentLogin(@Body() data: LoginDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {
        const student = await this.studentService.getByUsername(data.username);
        if (!student) {
            return new Promise(resolve =>
                 resolve(new ApiResponse('error',-3001, "Information u entered is incorrect")))
        }
        const passwordHash = crypto.createHash('sha512'); 
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

        if (student.passwordHash !== passwordHashString) {
            return new Promise(resolve =>
                resolve(new ApiResponse('error',-3002, "Information u entered is incorrect ")))
        }

        const thisMoment = new Date;
        thisMoment.setDate(thisMoment.getDate() + 64);
        const expTimestamp = thisMoment.getTime() / 1000;
         
        const jwtData: JwtDataDto = new JwtDataDto();
        jwtData.role = "student";
        jwtData.Id = student.studentId;
        jwtData.username = student.surname;

         jwtData.exp = expTimestamp;
         jwtData.ip = req.ip.toString();
         jwtData.userAgent = req.header["user-agent"];

        const token: string = jwt.sign(jwtData.toPlainObj(), jtwSecret ); 

        const responseObj = new LoginInfoDto(
            student.studentId,
            student.username,
            token
        )
        return new Promise( resolve => resolve(responseObj));
        

    }
}