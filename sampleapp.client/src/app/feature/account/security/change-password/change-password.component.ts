import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AppUserAuth } from 'src/app/core/interfaces/security/app-user-auth';
import { SnackbarService } from 'src/app/core/services/angular-material/snackbar.service';
import { SecurityService } from 'src/app/core/services/security/security.service';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  securityObject!: AppUserAuth;
  resetForm!: FormGroup;
  formSubmitted = false;

  constructor(
    private _securityService: SecurityService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackService: SnackbarService
  ){
    this.resetForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    //get security object
    this.securityObject = this._securityService.securityObject;

    if (this.securityObject.resetInProgress) {
      this.resetForm = this._formBuilder.group({
        resetCode: ['', Validators.required],
        newPassword: ['', Validators.required]
      });
    } else {
      this._router.navigate(["account/login"]);
    }
  }

  resetPassword() {
    this.formSubmitted = true;

    if (this.resetForm.invalid) {
      //notifiy user
      this._snackService.openSnackBar("Form incomplete. Please fix highlighted fields.");
    } else {
      //create json object to send to api
      let newPwdObj = {
        email: this.securityObject.userName,
        resetCode: this.resetForm.controls['resetCode'].value,
        newPassword: this.resetForm.controls['newPassword'].value
      }
      
      this._securityService.resetPwd(newPwdObj).pipe(first()).subscribe({
        next: (resp) => {
          this._snackService.openSnackBar("Password Reset");
          this.securityObject.init();
        },
        error: (e) => console.error(e),
        complete: () => this._router.navigate(['account/login'])
      })
    }
  }

}
