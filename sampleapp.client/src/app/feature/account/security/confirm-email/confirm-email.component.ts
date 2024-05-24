import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { first } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/angular-material/snackbar.service';
import { SecurityService } from 'src/app/core/services/security/security.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent implements OnInit {
	userId!: string;
	code!: string;
	email!: string;

	confirmed = true;
	failedConfirm = false;
	
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _securityService: SecurityService,
		private _snackService: SnackbarService
	){}

	ngOnInit(): void {
		this.userId = this._route.snapshot.queryParamMap.get("userId") ?? "";
		this.code = this._route.snapshot.queryParamMap.get("code") ?? "";
		this.email = this._route.snapshot.queryParamMap.get("email") ?? "";

		if( !this.userId || !this.code ){
			this._router.navigate(["account/login"]);
		} else {
			this.confirmEmail();
		}
	}

	confirmEmail(){
		this._securityService.confirmEmail( this.userId, this.code ).pipe(first()).subscribe({
			next: () => {
				this.confirmed = true;
			},
			error: (e) => {
				console.log(e);
				this.failedConfirm = true;
			},
			complete: () => this._snackService.openSnackBar("Email confirmed!")
		})
	}

	resendConfirmEmail(){
		if( this.email != "" ){
			const emailObj = {
				email: this.email
			}
			this._securityService.resendConfirmEmail( emailObj ).pipe(first()).subscribe({
				next: () => console.log("resent confirmation email"),
				error: (e) => console.error(e),
				complete: () => this._router.navigate(["account/email"])
			})
		}
	}
}
