import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataEngineerSalary } from '../interfaces/engineer-salary/engineer-salary';
import { SalaryService } from '../services/salary.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  salaries: DataEngineerSalary[] = [];
  jobTitles: string[] = [];
  selectedTitle: string = '';
  selectedTitleSalaries: DataEngineerSalary[] = [];

  constructor(private salaryService: SalaryService) {}

  ngOnInit(): void {
    this.getTopPaidSalaries();
    this.getJobTitles();
  }

  getTopPaidSalaries(): void {
    this.salaryService.getTopPaidSalaries(10).subscribe(
      (data: DataEngineerSalary[]) => this.salaries = data,
      (error) => console.error(error)
    );
  }

  getJobTitles(): void {
    this.salaryService.getUniqueJobTitles().subscribe(
      (data: string[]) => this.jobTitles = data,
      (error) => console.error(error)
    );
  }

  onTitleChange(): void {
    this.salaryService.getByTitle(this.selectedTitle).subscribe(
      (data: DataEngineerSalary[]) => {
        this.salaries = data.sort((a, b) => Number(b.salary_in_usd) - Number(a.salary_in_usd)); //order by salary descending
      },      
      (error) => console.error(error)
    );
  }

}
