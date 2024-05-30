import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalaryService } from 'src/app/core/services/salary.service';
import { DataEngineerSalary } from 'src/app/core/interfaces/engineer-salary/engineer-salary';
@Component({
  selector: 'app-add-data-engineer-salary',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-data-engineer-salary.component.html',
  styleUrl: './add-data-engineer-salary.component.scss'
})
export class AddDataEngineerSalaryComponent {
  salaryForm!: FormGroup;
  engineerSalary!: DataEngineerSalary;
  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private router: Router
  ) {
    this.salaryForm = this.fb.group({
      work_year: ["2024", Validators.required],
      experience_level: ["", Validators.required],
      employment_type: ["", Validators.required],
      job_title: ['', Validators.required],
      salary: [''], //
      salary_in_usd: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      salary_currency: ['USD'], //
      employee_residence: ['', Validators.required],
      company_location: ['', Validators.required],
      remote_ratio: ['', [Validators.required, Validators.pattern(/^(100|[1-9]?[0-9])$/)]],
      company_size: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.salaryForm.valid) {
      
    
      this.salaryForm.patchValue({
        salary : this.salaryForm.controls['salary_in_usd'].value,
        salary_currency: "USD"
      })
      this.salaryService.addDataEngineerSalary(this.salaryForm.value).subscribe({
        next: () => {
          alert('Salary added successfully');
          this.router.navigate(['/data/']); // Navigate to the desired page after successful addition
        },
        error: (error) => {
          console.error('Error adding salary', error);
          alert('An error occurred while adding the salary');
        }
      });
    }
  }
}
