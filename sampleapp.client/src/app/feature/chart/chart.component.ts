import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, FormsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {
  @Input() labels?: string[];
  @Input() data?: number[];

  @Output() filterChange = new EventEmitter<string>();

  selectedFilter: string = "";
  filterOptions: string[] = ["experience_level", "employment_type", "employee_residence", "company_location", "company_size", "remote_ratio"];

  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Salary',
      },
    ],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['labels']) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    if (this.data && this.labels) {
      this.chartData = {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            label: 'Salary',
          },
        ],
      };
    }
  }

  onFilterChange(): void {
    this.filterChange.emit(this.selectedFilter);
  }
}
