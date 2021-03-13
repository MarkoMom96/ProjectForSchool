export class LoginInfoDto {
  Id: number;
  username: string;
  token: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;

  constructor(
    id: number,
    username: string,
    token: string,
    refreshToken: string,
    refreshTokenExpiresAt: string,
  ) {
    this.Id = id;
    this.username = username;
    this.token = token;
    this.refreshToken = refreshToken;
    this.refreshTokenExpiresAt = refreshTokenExpiresAt;
  }
}
