export class LoginResp {

  tokenType!: "string";
  accessToken!: "string";
  expiresIn!: number;
  refreshToken!: "string";

}
// other responses could go here (login two factor, email confirmed, etc.)