import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataEngineerSalary } from '../interfaces/engineer-salary/engineer-salary';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  dataUrl = env.baseUrl + env.dataUrl;

  constructor(private http: HttpClient) { }

  getTopPaidSalaries(count: number): Observable<DataEngineerSalary[]> {
    return this.http.get<DataEngineerSalary[]>(`${this.dataUrl}${env.topPaid}/${count}`);
  }

  getById(id: number): Observable<DataEngineerSalary> {
    return this.http.get<DataEngineerSalary>(`${this.dataUrl}${env.getById}/${id}`);
  }

  getByRemote(): Observable<DataEngineerSalary[]> {
    return this.http.get<DataEngineerSalary[]>(`${this.dataUrl}${env.getByRemote}`);
  }

  getByTitle(title: string): Observable<DataEngineerSalary[]> {
    return this.http.get<DataEngineerSalary[]>(`${this.dataUrl}${env.getByTitle}/${title}`);
  }

  getUniqueJobTitles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.dataUrl}${env.getTitles}`);
  }

  addDataEngineerSalary(salary: DataEngineerSalary): Observable<DataEngineerSalary> {
    return this.http.post<DataEngineerSalary>(this.dataUrl, salary);
  }
}
