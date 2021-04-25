import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,  AfterViewInit {
  title = 'F1 Dashboard';
  isDriver = true;
  isConstructor = false;
  driverColumns: string[] = ['drivers_name', 'position', 'points', 'wins', 'constructor'];
  constructorColumns: string[] = ['drivers_name', 'position', 'points', 'wins', 'constructor'];
  @ViewChild(MatSort) sort: MatSort;
  constructor(public data: DataService) {

  }


  ngOnInit(): void {
    this.data.getDriverStandingsData();
    this.data.getConstructorStandingsData();
  }

  ngAfterViewInit(): void {

  }

  onValueChanged(value: string): void {
    switch (value){
      case 'constructor':
        this.isDriver = false;
        this.isConstructor = true;
        break;
      case 'driver':
        this.isDriver = true;
        this.isConstructor = false;
        break;
      default:
        this.isDriver = true;
        this.isConstructor = false;
    }
  }



}
