//
//Superclass for AppUserAuth
export class UserAuthBase {
    userName: string = "";
    refreshToken: string = "";
    accessToken: string = "";
    isAuthenticated: boolean = false;

    init(): this {
        this.userName = "";
        this.refreshToken = "";
        this.accessToken = "";
        this.isAuthenticated = false;
        return this;
    }
}
