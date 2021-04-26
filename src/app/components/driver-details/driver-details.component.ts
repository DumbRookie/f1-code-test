import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute, public data: DataService) {
    this.id = this.route.snapshot.paramMap.get('driverId');
    this.data.getDriverInfo(this.id);
  }

  ngOnInit(): void {
  }

}
