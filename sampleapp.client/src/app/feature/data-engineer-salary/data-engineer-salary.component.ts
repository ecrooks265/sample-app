import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryService } from 'src/app/core/services/salary.service';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { AddDataEngineerSalaryComponent } from './add-data-engineer-salary/add-data-engineer-salary.component';
import { DataEngineerSalary } from 'src/app/core/interfaces/engineer-salary/engineer-salary';
import { FormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-data-engineer-salary',
  templateUrl: './data-engineer-salary.component.html',
  styleUrls: ['./data-engineer-salary.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSidenavModule, MatIconModule]
})
export class DataEngineerSalaryComponent implements OnInit {

  topSalaries: DataEngineerSalary[] = [];
  jobTitles: string[] = [];
  selectedTitle: string = '';
  salariesByTitle: DataEngineerSalary[] = [];
  selectedTitle2: string = '';
  salariesByTitle2: DataEngineerSalary[] = [];

  showSecondColumn: boolean = false;


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
  }

  onTitleChange(): void {
    if (this.selectedTitle) {
      this.salaryService.getByTitle(this.selectedTitle).subscribe(
        (data: DataEngineerSalary[]) =>   this.salariesByTitle = data.sort((a, b) => Number(b.salary_in_usd) - Number(a.salary_in_usd)), //order by salary descending,
        (error) => console.error('Error fetching salaries by title', error)
      );
    }
  }

  onTitleChange2(): void {
    if (this.selectedTitle2) {
      this.salaryService.getByTitle(this.selectedTitle2).subscribe(
        (data: DataEngineerSalary[]) =>   this.salariesByTitle2 = data.sort((a, b) => Number(b.salary_in_usd) - Number(a.salary_in_usd)), //order by salary descending,
        (error) => console.error('Error fetching salaries by title', error)
      );
    }
  }


  toggleSecondColumn() {
    this.showSecondColumn = !this.showSecondColumn;
    const secondColumn = document.getElementById('secondColumn');
    if (secondColumn) {
      if (this.showSecondColumn) {
        secondColumn.classList.remove('hidden');
      } else {
        secondColumn.classList.add('hidden');
      }
    }
  }
  
}
/* ---- Engineer-Data Routes ---- */
export const data_routes: Routes = [
  { path: "", component: DataEngineerSalaryComponent, canActivate: [authGuard] },
  { path: "add-data-engineer-salary", component: AddDataEngineerSalaryComponent, canActivate: [authGuard] }
]
