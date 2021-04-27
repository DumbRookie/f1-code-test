import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService, DriverStandings} from '../../services/data.service';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';


@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.scss']
})
export class DriverTableComponent implements OnInit, AfterViewInit {
  driverColumns: string[] = ['drivers_name', 'position', 'points', 'wins', 'constructor'];
  @ViewChild('filterInput', {static: true}) input: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  filterColumn = '';

  constructor(public data: DataService, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.data.driverDataSource.sort = this.sort;
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
      this.data.driverDataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.data.driverDataSource.filterPredicate = (data: DriverStandings, filter: string) => {
        return data[this.filterColumn] === filter;
      };
      this.data.driverDataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  }

