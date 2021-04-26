import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.scss']
})
export class DriverTableComponent implements OnInit, AfterViewInit {
  driverColumns: string[] = ['drivers_name', 'position', 'points', 'wins', 'constructor'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(public data: DataService, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.data.driverDataSource.sort = this.sort;
  }


  showDriver(row): void {
    this.data.clearCurrent();
    this.data.getDriverInfo(row.driverId);
    this.router.navigateByUrl('/driver/' + row.driverId).then();
  }
}
