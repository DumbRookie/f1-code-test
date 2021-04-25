import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.scss']
})
export class DriverTableComponent implements OnInit, AfterViewInit {
  driverColumns: string[] = ['drivers_name', 'position', 'points', 'wins', 'constructor'];
  @ViewChild(MatSort) sort: MatSort;
  constructor(public data: DataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.data.driverDataSource.sort = this.sort;
  }


}
