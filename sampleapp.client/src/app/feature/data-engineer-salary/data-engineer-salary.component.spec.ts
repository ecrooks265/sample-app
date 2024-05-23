import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEngineerSalaryComponent } from './data-engineer-salary.component';

describe('DataEngineerSalaryComponent', () => {
  let component: DataEngineerSalaryComponent;
  let fixture: ComponentFixture<DataEngineerSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEngineerSalaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataEngineerSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
