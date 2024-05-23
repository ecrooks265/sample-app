/* ---- User Data from Database -- */
        //[FirstName]
        //[LastName]
        //[Address1]
        //[Address2]
        //[City]
        //[State]
        //[PostalCode]
        //[UserName]
        //[NormalizedUserName]
        //[Email]
        //[NormalizedEmail]
        //[EmailConfirmed]
        //[PasswordHash]
        //[SecurityStamp]
        //[ConcurrencyStamp]
        //[PhoneNumber]
        //[PhoneNumberConfirmed]
        //[TwoFactorEnabled]
        //[LockoutEnd]
        //[LockoutEnabled]
        //[AccessFailedCount]

import { UserBase } from "./user-base";

//AppUser extends superclass of user
export class AppUser extends UserBase {
    //matches dbo.aspnetusers.
    firstName?: string;
    lastName: string = "";
    address1: string = "";
    address2: string = "";
    city: string = "";
    state: string = "";
    postalCode: string = "";
    phoneNumber?: string = "";


    isComplete(): boolean {
        //determines if account is completed
        if (
            this.lastName != "" && this.lastName != null &&
            this.firstName != "" && this.firstName != null &&
            this.address1 != "" && this.address1 != null &&
            this.city != "" && this.city != null &&
            this.state != "" && this.state != null &&
            this.postalCode != "" && this.postalCode != null &&
            this.email != "" && this.email != null) {
            return true;
        }
        else {
            return false;
        }
    }



}
