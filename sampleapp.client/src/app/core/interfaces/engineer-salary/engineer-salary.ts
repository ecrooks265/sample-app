export interface DataEngineerSalary {
    [key: string]: any; // for filtering by a property -- see data-engineer-salary component
    id: number;
    work_year: number;
    experience_level: string;
    employment_type: string;
    job_title: string;
    salary: string;
    salary_currency: string;
    salary_in_usd: string;
    employee_residence: string;
    remote_ratio: string;
    company_location: string;
    company_size: string;

}
  