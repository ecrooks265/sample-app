import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataEngineerSalaryComponent } from './add-data-engineer-salary.component';

describe('AddDataEngineerSalaryComponent', () => {
  let component: AddDataEngineerSalaryComponent;
  let fixture: ComponentFixture<AddDataEngineerSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDataEngineerSalaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDataEngineerSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
