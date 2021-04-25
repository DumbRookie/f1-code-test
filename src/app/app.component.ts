import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import set = Reflect.set;
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'F1 Dashboard';
  isDriver = true;
  isConstructor = false;
  sub: Subscription;
  doneLoading = false;

  constructor(public data: DataService) {
  }

  ngOnInit(): void {
    this.data.getDriverStandingsData();
    this.data.getConstructorStandingsData();
  }

  ngAfterViewInit(): void {
    this.sub = this.data.initializedState.subscribe((state) => {
      this.doneLoading = state;

    });
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
