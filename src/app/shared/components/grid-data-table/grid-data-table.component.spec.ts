import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDataTableComponent } from './grid-data-table.component';

describe('GridDataTableComponent', () => {
  let component: GridDataTableComponent;
  let fixture: ComponentFixture<GridDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
