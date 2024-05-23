export class RegisterRequest {

  password!:string;

}
export class LoginRequest {
  
  email!:string;
  password!:string;
  twoFactorCode!:string;
  twoFactorRecoveryCode!:string;

  init(email: string, password: string): void {
    this.email = email;
    this.password = password;
    this.twoFactorCode = '';
    this.twoFactorRecoveryCode = '';
  }

}
export class RefreshRequest {

  refreshToken!:string;

}
export class ResendConfirmationEmailRequest {

  email!:string;

}
export class ForgotPasswordRequest {

  email!:string;

}
export class ResetPasswordRequest {

  email!:string;
  resetCode!:string;
  newPassword!:string;

}
export class TwoFactorRequest {

  enable!: boolean;
  twoFactorCode!: string;
  resetSharedKey!: boolean;
  resetRecoveryCodes!:boolean;
  forgetMachine!:boolean;

}
export class TwoFactorResponse {

  sharedKey!:string;
  recoveryCodesLeft!: number;
  recoveryCodes!: string[];
  isTwoFactorEnabled!:boolean;
  isMachineRemembered!:boolean;

}
export class InfoResponse {

  email!:string;
  isEmailConfirmed!:boolean;

}
export class InfoRequest {
  
  newEmail!:string;
  newPassword!:string;
  oldPassword!:string;

}
