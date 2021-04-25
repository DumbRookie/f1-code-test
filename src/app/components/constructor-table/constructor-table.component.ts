import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-constructor-table',
  templateUrl: './constructor-table.component.html',
  styleUrls: ['./constructor-table.component.scss']
})

export class ConstructorTableComponent implements OnInit, AfterViewInit {
  constructorColumns: string[] = ['drivers_name', 'position', 'points', 'wins', 'constructor'];
  @ViewChild(MatSort) sort: MatSort;
  constructor(public data: DataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.data.constructorDataSource.sort = this.sort;
  }

}
