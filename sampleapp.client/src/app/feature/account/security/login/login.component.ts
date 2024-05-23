import { Component, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecurityService } from '../../../../core/services/security/security.service';
import { SnackbarService } from '../../../../core/services/angular-material/snackbar.service';
import { LoginRequest } from 'src/app/core/models/account-request-models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFailed = false;
  failedReason = "";
  loginForm!: FormGroup;
  formSubmitted = false;
  signInInfo = new LoginRequest();

  constructor(
    private _securityService: SecurityService,
    private _router: Router,
    private _snackService: SnackbarService,
    private _formBuilder: FormBuilder
  ) { 
      this.loginForm = this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      //notify user
      this._snackService.openSnackBar("Form incomplete");
    } else {
      //create login object
      this.signInInfo.init(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
      this._securityService.login(this.signInInfo).pipe(first()).subscribe({
        next: (resp) => this._snackService.openSnackBar("Log In Successful"),
        error: (e) => {
          if (e.status === 401) {
            this.failedReason = "Invalid username or password";
            this.loginFailed = true;
          }
        },
        complete: () => this._router.navigate([''])
      })
    }

  }

}
