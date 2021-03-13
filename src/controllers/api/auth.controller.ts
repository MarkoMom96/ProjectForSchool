import {
  Controller,
  Post,
  Param,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProfessorService } from 'src/services/professor/professor.service';
import { StudentService } from 'src/services/student/student.service';
import { LoginDto } from 'src/dtos/auth/login.dto';
import { ApiResponse } from '../misc/api.response.class';
import * as crypto from 'crypto';
import { LoginInfoDto } from 'src/dtos/auth/login.info';
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from 'src/dtos/auth/jwt.data.dto';
import { Request } from 'express';
import { jtwSecret } from 'config/jtw.secter';
import { JwtRefreshDataDto } from 'src/dtos/auth/jwt.refresh.dto';
import { RefreshTokenDto } from 'src/dtos/auth/refresh.token.dto';

@Controller('auth/')
export class AuthController {
  constructor(
    public studentService: StudentService,
    public professorService: ProfessorService,
  ) {}

  @Post('professor/login') // localhost:3000/auth/professor/login
  async doProfessorLogin(
    @Body() data: LoginDto,
    @Req() req: Request,
  ): Promise<LoginInfoDto | ApiResponse> {
    const professor = await this.professorService.getByUsername(data.username);
    if (!professor)
      return new ApiResponse(
        'error',
        -3001,
        'Information u entered is incorrect',
      );

    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

    if (professor.passwordHash !== passwordHashString)
      return new ApiResponse(
        'error',
        -3002,
        'Information u entered is incorrect',
      );

    const jwtData: JwtDataDto = new JwtDataDto();
    jwtData.role = 'professor';
    jwtData.Id = professor.professorId;
    jwtData.username = professor.username;
    jwtData.exp = this.getExpireDate(60 * 2);
    jwtData.ip = req.ip.toString();
    jwtData.userAgent = req.header['user-agent'];

    const token: string = jwt.sign(jwtData.toPlainObj(), jtwSecret);

    const jwtRefreshData = new JwtRefreshDataDto();
    jwtRefreshData.role = jwtData.role;
    jwtRefreshData.Id = jwtData.Id;
    jwtRefreshData.username = jwtData.username;
    jwtRefreshData.exp = this.getExpireDate(60 * 60 * 24 * 32);
    jwtRefreshData.ip = jwtData.ip;
    jwtRefreshData.userAgent = jwtData.userAgent;

    const refreshToken: string = jwt.sign(
      jwtRefreshData.toPlainObj(),
      jtwSecret,
    );

    const responseObj = new LoginInfoDto(
      professor.professorId,
      professor.username,
      token,
      refreshToken,
      this.getIsoDate(jwtRefreshData.exp),
    );

    await this.professorService.addToken(
      professor.professorId,
      refreshToken,
      this.getDataBaseDateFormat(this.getIsoDate(jwtRefreshData.exp)),
    );

    return responseObj;
  }

  @Post('professor/refresh') //  POST http://localhost:3000/auth/professor/refresh
  async ProfessorTokenRefresh(
    @Req() req: Request,
    @Body() data: RefreshTokenDto,
  ): Promise<LoginInfoDto | ApiResponse> {
    const professorToken = await this.professorService.getProfessorToken(
      data.token,
    );

    if (!professorToken)
      return new ApiResponse('error', -10002, 'Refresh token not found!');

    if (professorToken.isValid === 0)
      return new ApiResponse('error', -10003, 'The token is no longer valid!');

    const now = new Date();
    const expirationDate = new Date(professorToken.expiresAt);

    if (expirationDate.getTime() < now.getTime())
      return new ApiResponse('error', -10004, 'The token has expired');

    let jwtRefreshData: JwtRefreshDataDto;
    try {
      jwtRefreshData = jwt.verify(data.token, jtwSecret);
    } catch (error) {
      throw new HttpException('Bad token found 2', HttpStatus.UNAUTHORIZED);
    }

    if (!jwtRefreshData)
      throw new HttpException('Bad token found 3 ', HttpStatus.UNAUTHORIZED);

    if (jwtRefreshData.ip !== req.ip.toString())
      throw new HttpException('Bad token found( ip )', HttpStatus.UNAUTHORIZED);

    if (jwtRefreshData.userAgent !== req.header['user-agent'])
      throw new HttpException('Bad token found( ua )', HttpStatus.UNAUTHORIZED);

    const jwtData: JwtDataDto = new JwtDataDto();
    jwtData.role = jwtRefreshData.role;
    jwtData.Id = jwtRefreshData.Id;
    jwtData.username = jwtRefreshData.username;
    jwtData.exp = this.getExpireDate(60 * 2);
    jwtData.ip = jwtRefreshData.ip;
    jwtData.userAgent = jwtRefreshData.userAgent;

    const token: string = jwt.sign(jwtData.toPlainObj(), jtwSecret);

    const responseObj = new LoginInfoDto(
      jwtData.Id,
      jwtData.username,
      token,
      data.token,
      this.getIsoDate(jwtRefreshData.exp),
    );

    return responseObj;
  }

  @Post('student/login') // localhost:3000/auth/student/login
  async doStudentLogin(
    @Body() data: LoginDto,
    @Req() req: Request,
  ): Promise<LoginInfoDto | ApiResponse> {
    const student = await this.studentService.getByUsername(data.username);
    if (!student)
      return new ApiResponse(
        'error',
        -3001,
        'Information u entered is incorrect',
      );
    const passwordHash = crypto.createHash('sha512');
    passwordHash.update(data.password);
    const passwordHashString = passwordHash.digest('hex').toLocaleUpperCase();

    if (student.passwordHash !== passwordHashString)
      return new ApiResponse(
        'error',
        -3001,
        'Information u entered is incorrect',
      );

    const jwtData: JwtDataDto = new JwtDataDto();
    jwtData.role = 'student';
    jwtData.Id = student.studentId;
    jwtData.username = student.username;
    jwtData.exp = this.getExpireDate(60 * 10);
    jwtData.ip = req.ip.toString();
    jwtData.userAgent = req.header['user-agent'];

    const token: string = jwt.sign(jwtData.toPlainObj(), jtwSecret);

    const jwtRefreshData = new JwtRefreshDataDto();
    jwtRefreshData.role = jwtData.role;
    jwtRefreshData.Id = jwtData.Id;
    jwtRefreshData.username = jwtData.username;
    jwtRefreshData.exp = this.getExpireDate(60 * 60 * 24 * 32);
    jwtRefreshData.ip = jwtData.ip;
    jwtRefreshData.userAgent = jwtData.userAgent;

    const refreshToken: string = jwt.sign(
      jwtRefreshData.toPlainObj(),
      jtwSecret,
    );

    const responseObj = new LoginInfoDto(
      student.studentId,
      student.username,
      token,
      refreshToken,
      this.getIsoDate(jwtRefreshData.exp),
    );

    await this.studentService.addToken(
      student.studentId,
      refreshToken,
      this.getDataBaseDateFormat(this.getIsoDate(jwtRefreshData.exp)),
    );

    return responseObj;
  }

  @Post('student/refresh') //  POST http://localhost:3000/auth/student/refresh
  async StudentTokenRefresh(
    @Req() req: Request,
    @Body() data: RefreshTokenDto,
  ): Promise<LoginInfoDto | ApiResponse> {
    const studentToken = await this.studentService.getStudentToken(data.token);

    if (!studentToken)
      return new ApiResponse('error', -10002, 'Refresh token not found!');

    if (studentToken.isValid === 0)
      return new ApiResponse('error', -10003, 'The token is no longer valid!');

    const now = new Date();
    const expirationDate = new Date(studentToken.expiresAt);

    if (expirationDate.getTime() < now.getTime())
      return new ApiResponse('error', -10004, 'The token has expired');

    let jwtRefreshData: JwtRefreshDataDto;
    try {
      jwtRefreshData = jwt.verify(data.token, jtwSecret);
    } catch (error) {
      throw new HttpException('Bad token found 2', HttpStatus.UNAUTHORIZED);
    }

    if (!jwtRefreshData)
      throw new HttpException('Bad token found 3 ', HttpStatus.UNAUTHORIZED);

    if (jwtRefreshData.ip !== req.ip.toString())
      throw new HttpException('Bad token found( ip )', HttpStatus.UNAUTHORIZED);

    if (jwtRefreshData.userAgent !== req.header['user-agent'])
      throw new HttpException('Bad token found( ua )', HttpStatus.UNAUTHORIZED);

    const jwtData: JwtDataDto = new JwtDataDto();
    jwtData.role = jwtRefreshData.role;
    jwtData.Id = jwtRefreshData.Id;
    jwtData.username = jwtRefreshData.username;
    jwtData.exp = this.getExpireDate(60 * 10);
    jwtData.ip = jwtRefreshData.ip;
    jwtData.userAgent = jwtRefreshData.userAgent;

    const token: string = jwt.sign(jwtData.toPlainObj(), jtwSecret);

    const responseObj = new LoginInfoDto(
      jwtData.Id,
      jwtData.username,
      token,
      data.token,
      this.getIsoDate(jwtRefreshData.exp),
    );

    return responseObj;
  }

  private getExpireDate(numOfSeconds: number) {
    return new Date().getTime() / 1000 + numOfSeconds;
  }
  private getIsoDate(timestamp: number) {
    const date = new Date();
    date.setTime(timestamp * 1000);
    return date.toISOString();
  }
  private getDataBaseDateFormat(isoFormat: string): string {
    return isoFormat.substring(0, 19).replace('T', ' ');
  }
}
