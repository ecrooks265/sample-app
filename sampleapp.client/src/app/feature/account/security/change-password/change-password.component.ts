import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AppUserAuth } from 'src/app/core/interfaces/security/app-user-auth';
import { SnackbarService } from 'src/app/core/services/angular-material/snackbar.service';
import { SecurityService } from 'src/app/core/services/security/security.service';

@Component({
  selector: 'app-reset-password',
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

  code!: string;
  email!: string;

  constructor(
    private _route: ActivatedRoute,
    private _securityService: SecurityService,
    private _fb: FormBuilder,
    private _router: Router,
    private _snackService: SnackbarService
  ){}

  ngOnInit(): void {
		this.code = this._route.snapshot.queryParamMap.get("code") ?? "";
		this.email = this._route.snapshot.queryParamMap.get("email") ?? "";

		if( !this.email || !this.code ){
			this._router.navigate(["account/login"]);
		} else {
			this.resetForm = this._fb.group({
        newPassword: ['', Validators.required]
      });
		}
  }

  resetPassword() {
    this.formSubmitted = true;

    if (this.resetForm.invalid) {
      //notifiy user of error
      this._snackService.openSnackBar("Form incomplete. Please fix to meet password requirements.");
    } else {
      const newPassword = {
        email: this.email,
        resetCode: this.code,
        newPassword: this.resetForm.controls['newPassword'].value
      }

      this._securityService.resetPwd(newPassword).pipe(first()).subscribe({
        next: () => {
          this._snackService.openSnackBar("Successfully reset password");
          this.securityObject.init();
        },
        error: (e) => console.error(e),
        complete: () => this._router.navigate(['account/login'])
      })
    }
  }
}
