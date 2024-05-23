import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { SecurityService } from '../../../../core/services/security/security.service';
import { invalidCharValidator, passwordLengthValidator, passwordLowerValidator, passwordMatchingValidator, passwordUniqueValidator, passwordUpperValidator } from '../../../../library/validators/pwd-match.validator';
import { SnackbarService } from '../../../../core/services/angular-material/snackbar.service';
import { LoginRequest } from 'src/app/core/models/account-request-models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  signInInfo = new LoginRequest();
  formSubmitted = false;
  errorMsgs: string[] = [];

  notMatchedMsg = "Passwords do not match";
  tooShortMsg = "- be at least 10 characters long";
  noUpperMsg = "- contain at least 1 uppercase character";
  noLowerMsg = "- contain at least 1 lowercase character";
  notUniqueMsg = "- have at least 8 unique characters";
  invalidCharMsg = {
    pass: "password must contain: ",
    sub1: "alphanumeric: (a-z, A-Z, 0-9)",
    sub2: "approved special characters: (-._@+'#!/^%{}*)"
  };

  constructor(
    private _securityService: SecurityService,
    private _router: Router,
    private _snackService: SnackbarService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    this.registerForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9\-._@+'#!/^%{}*]{10,}$/)])],
      confirmpassword: ['', Validators.required]
    },
      {
        validators: [
          passwordMatchingValidator,
          passwordLengthValidator,
          passwordLowerValidator,
          passwordUpperValidator,
          passwordUniqueValidator,
          invalidCharValidator
        ]
      });
  }

  register() {
    this.formSubmitted = true;
    this.updateErrorMessages();

    if (this.registerForm.invalid) {
      console.log(this.registerForm.errors);
      this._snackService.openSnackBar("Form Incomplete");
    } else {
      // Create register object to send to API
      this.signInInfo.init(this.registerForm.controls['email'].value, this.registerForm.controls['password'].value);

      this._securityService.register(this.signInInfo).pipe(first()).subscribe({
        next: () => this._snackService.openSnackBar("Please check your email to confirm registration"),
        error: (e) => console.error(e),
        complete: () => {
          // Reset form & navigate home
          this.resetForm();
          this._router.navigate([""]);
        }
      });
    }
  }

  updateErrorMessages() {
    const errors = this.registerForm.errors;
    this.errorMsgs = [];

    if (errors) {
      if (errors['notmatched']) {
        this.errorMsgs.push(this.notMatchedMsg);
      }
      if (errors['tooshort']) {
        this.errorMsgs.push(this.tooShortMsg);
      }
      if (errors['noupper']) {
        this.errorMsgs.push(this.noUpperMsg);
      }
      if (errors['nolower']) {
        this.errorMsgs.push(this.noLowerMsg);
      }
      if (errors['notunique']) {
        this.errorMsgs.push(this.notUniqueMsg);
      }
      if (errors['invalidchar']) {
        this.errorMsgs.push(this.invalidCharMsg.pass, this.invalidCharMsg.sub1, this.invalidCharMsg.sub2);
      }
    }
  }
}
