import { UserAuthBase } from "./user-auth-base";


export class AppUserAuth extends UserAuthBase {
    expiration: Date = new Date(); //for refresh token. Request new token based on expiration
    resetInProgress: boolean = false; //for password reset. 

    override init(): this {
        super.init(); // resets values in superclass
        this.accessToken = "";
        this.expiration = new Date();
        this.resetInProgress = false;
        return this;
    }
}
