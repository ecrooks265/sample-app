import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { SecurityService } from '../../../../core/services/security/security.service';
import { SnackbarService } from '../../../../core/services/angular-material/snackbar.service';
import { AppUserAuth } from 'src/app/core/interfaces/security/app-user-auth';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  securityObject!: AppUserAuth;
  forgotForm!: FormGroup;
  formSubmitted = false;

  constructor(
    private _securityService: SecurityService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _snackService: SnackbarService
  ) { 
      this.forgotForm = this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.securityObject = this._securityService.securityObject;

    this.forgotForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  resetRequest() {
    this.formSubmitted = true;

    if (this.forgotForm.invalid) {
      //notify user
      this._snackService.openSnackBar("Please provide a valid email");
    } else {
      //create object for api
      let emailObj = {
        email: this.forgotForm.controls["email"].value
      };

      this._securityService.forgotPwd(emailObj).pipe(first()).subscribe({
        next: (resp) => {
          //store for next page
          this.securityObject.userName = this.forgotForm.controls["email"].value;
          this.securityObject.resetInProgress = true;
        },
        error: (e) => this._snackService.openSnackBar("Something went wrong with your request. Please try again."),
        complete: () => this._router.navigate(["account/reset"])
      })
    }

  }
}
