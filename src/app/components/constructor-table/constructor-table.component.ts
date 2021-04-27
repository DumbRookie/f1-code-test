import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-constructor-table',
  templateUrl: './constructor-table.component.html',
  styleUrls: ['./constructor-table.component.scss']
})

export class ConstructorTableComponent implements OnInit, AfterViewInit {
  constructorColumns: string[] = ['drivers_name', 'position', 'points', 'wins', 'constructor'];
  @ViewChild(MatSort) sort: MatSort;
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

}
