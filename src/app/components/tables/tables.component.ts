import {AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, AfterContentInit, OnDestroy {

  title = 'F1 Dashboard';
  isDriver = true;
  isConstructor = false;
  sub: Subscription;
  doneLoading = false;

  constructor(public data: DataService) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
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
