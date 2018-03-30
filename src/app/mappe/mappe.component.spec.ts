import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappeComponent } from './mappe.component';

describe('MappeComponent', () => {
  let component: MappeComponent;
  let fixture: ComponentFixture<MappeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
