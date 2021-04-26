import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, } from '@angular/core';
import {DataService} from './services/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'F1 Dashboard';
  constructor(public data: DataService) {
  }

  ngOnInit(): void {
    this.data.getDriverStandingsData();
    this.data.getConstructorStandingsData();
  }
}
