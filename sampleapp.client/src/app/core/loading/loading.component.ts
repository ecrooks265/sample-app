import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading',
  template: `
    @if(loading$ | async){
    <div class="loading-overlay">
      <div>Loading...</div>
      <mat-progress-spinner color="primary" mode="indeterminate"></mat-progress-spinner>
    </div>
    }
  `,
  styles: [`
    mat-progress-spinner{
      margin-top: 10px;

    }
    .loading-overlay {
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      justify-content: center;
      background-color: white;
      z-index: 10;
      transition: opacity 0.3s ease-in-out;
      opacity: 1;
    }
    .loading-overlay.ng-hide {
      opacity: 0;
    }
  `],
  standalone: true,
  imports: [ MatProgressSpinnerModule, MatProgressBarModule, CommonModule ]
})
export class LoadingComponent {
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}

