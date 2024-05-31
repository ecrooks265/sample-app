import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryService } from 'src/app/core/services/salary.service';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { AddDataEngineerSalaryComponent } from './add-data-engineer-salary/add-data-engineer-salary.component';
import { DataEngineerSalary } from 'src/app/core/interfaces/engineer-salary/engineer-salary';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-data-engineer-salary',
  templateUrl: './data-engineer-salary.component.html',
  styleUrls: ['./data-engineer-salary.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSidenavModule, MatIconModule, ChartComponent]
})
export class DataEngineerSalaryComponent implements OnInit {
  topSalaries: DataEngineerSalary[] = [];
  jobTitles: string[] = [];
  selectedTitle: string = '';
  salariesByTitle: DataEngineerSalary[] = [];
  selectedTitle2: string = '';
  salariesByTitle2: DataEngineerSalary[] = [];
  showSecondColumn: boolean = false;
  showChart1: boolean = false;
  showChart2: boolean = false;

  chartLabels: string[] = [];
  chartData: number[] = [];
  chartLabels2: string[] = [];
  chartData2: number[] = [];

  selectedFilter: string = 'job_title';
  selectedFilter2: string = 'job_title';
  filters: string[] = ['job_title', 'experience_level', 'company_location', 'company_size', 'remote_ratio'];

  constructor(private salaryService: SalaryService) {}

  ngOnInit(): void {
    this.getUniqueJobTitles();
  }

  getUniqueJobTitles(): void {
    this.salaryService.getUniqueJobTitles().subscribe(
      (data: string[]) => {
        this.jobTitles = data.sort();
      },
      (error) => console.error('Error fetching job titles', error)
    );
    //load initial data to table
    this.salaryService.getByTitle(this.selectedTitle).subscribe(
      (data: DataEngineerSalary[]) => {
          this.salariesByTitle = data.sort((a, b) => Number(b.salary_in_usd) - Number(a.salary_in_usd));
          this.salariesByTitle2 = data.sort((a, b) => Number(b.salary_in_usd) - Number(a.salary_in_usd));
          this.updateChartData();
          this.updateChartData2();
        },
        (error) => console.error('Error fetching salaries by title', error)
      );
  }
  onTitleChange(): void {
    if (this.selectedTitle) {
      this.salaryService.getByTitle(this.selectedTitle).subscribe(
        (data: DataEngineerSalary[]) => {
          this.salariesByTitle = data.sort((a, b) => Number(b.salary_in_usd) - Number(a.salary_in_usd));
          this.updateChartData();
        },
        (error) => console.error('Error fetching salaries by title', error)
      );
    }
  }
  
  onTitleChange2(): void {
    if (this.selectedTitle2) {
      this.salaryService.getByTitle(this.selectedTitle2).subscribe(
        (data: DataEngineerSalary[]) => {
          this.salariesByTitle2 = data.sort((a, b) => Number(b.salary_in_usd) - Number(a.salary_in_usd));
          this.updateChartData2();
        },
        (error) => console.error('Error fetching salaries by title', error)
      );
    }
  }
  
  toggleSecondColumn() {
    this.showSecondColumn = !this.showSecondColumn;
  }

  toggleChart1() {
    this.showChart1 = !this.showChart1;
  }

  toggleChart2() {
    this.showChart2 = !this.showChart2;
  }

updateChartData() {
  const tempSalaries = this.salariesByTitle.slice().sort((a, b) => {
    // Compare values based on the selected filter
    if (a[this.selectedFilter] < b[this.selectedFilter]) return -1;
    if (a[this.selectedFilter] > b[this.selectedFilter]) return 1;
    return 0;
  });

  this.chartLabels = tempSalaries.map(salary => salary[this.selectedFilter]);
  this.chartData = tempSalaries.map(salary => Number(salary.salary_in_usd));
}

updateChartData2() {
  const tempSalaries2 = this.salariesByTitle2.slice().sort((a, b) => {
    // Compare values based on the selected filter
    if (a[this.selectedFilter2] < b[this.selectedFilter2]) return -1;
    if (a[this.selectedFilter2] > b[this.selectedFilter2]) return 1;
    return 0;
  });

  this.chartLabels2 = tempSalaries2.map(salary => salary[this.selectedFilter2]);
  this.chartData2 = tempSalaries2.map(salary => Number(salary.salary_in_usd));
}


  onFilterChange(selectedFilter: string): void {

    this.selectedFilter = selectedFilter;
    this.updateChartData();
  }
  
  onFilterChange2(selectedFilter: string): void {
    this.selectedFilter2 = selectedFilter;
    this.updateChartData2();
  }
}


/* ---- Engineer-Data Routes ---- */
export const data_routes: Routes = [
  { path: "", component: DataEngineerSalaryComponent, canActivate: [authGuard] },
  { path: "add-data-engineer-salary", component: AddDataEngineerSalaryComponent, canActivate: [authGuard] }
]
