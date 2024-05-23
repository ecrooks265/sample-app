import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SecurityService } from '../services/security/security.service';
import { AppUserAuth } from '../interfaces/security/app-user-auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  securityObject!: AppUserAuth;

  constructor(private _securityService: SecurityService) {

  }
  ngOnInit(): void {
    
    this.securityObject = this._securityService.securityObject;
    console.log(this.securityObject);
  }
}
