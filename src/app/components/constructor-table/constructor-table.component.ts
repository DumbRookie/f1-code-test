import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {ConstructorStandings, DataService, DriverStandings} from '../../services/data.service';
import {Router} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-constructor-table',
  templateUrl: './constructor-table.component.html',
  styleUrls: ['./constructor-table.component.scss']
})

export class ConstructorTableComponent implements OnInit, AfterViewInit {
  constructorColumns: string[] = ['constructor', 'nationality', 'position', 'points', 'wins'];
  filterColumn = '';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterInput', {static: true}) input: ElementRef;
  constructor(public data: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.data.constructorDataSource.sort = this.sort;
  }

  showConstructor(row): void {
    this.data.clearCurrent();
    this.data.getConstructorInfo(row.constructorId);
    this.router.navigateByUrl('/constructor/' + row.constructorId).then();
  }

  showDriver(row: any): void {
    this.data.clearCurrent();
    this.data.getDriverInfo(row.driverId);
    this.router.navigateByUrl('/driver/' + row.driverId).then();
  }

  setColumnName(event: MatSelectChange): void {
    this.filterColumn = event.source.triggerValue;
    const trigger = new KeyboardEvent('keyup');
    this.input.nativeElement.dispatchEvent(trigger);
  }

  filterByColumn(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.filterColumn === '' || this.filterColumn === undefined) {
      this.data.constructorDataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.data.constructorDataSource.filterPredicate = (data: ConstructorStandings, filter: string) => {
        return data[this.filterColumn] === filter;
      };
      this.data.constructorDataSource.filter = filterValue.trim().toLowerCase();
    }
  }

}
