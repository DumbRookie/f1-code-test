import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-constructor-details',
  templateUrl: './constructor-details.component.html',
  styleUrls: ['./constructor-details.component.scss']
})
export class ConstructorDetailsComponent implements OnInit {
  constructor(public data: DataService) {
  }

  ngOnInit(): void {
  }

}
