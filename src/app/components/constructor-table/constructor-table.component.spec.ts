import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorTableComponent } from './constructor-table.component';

describe('ConstructorTableComponent', () => {
  let component: ConstructorTableComponent;
  let fixture: ComponentFixture<ConstructorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
