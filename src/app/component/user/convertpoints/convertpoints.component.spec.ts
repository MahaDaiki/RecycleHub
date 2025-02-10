import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertpointsComponent } from './convertpoints.component';

describe('ConvertpointsComponent', () => {
  let component: ConvertpointsComponent;
  let fixture: ComponentFixture<ConvertpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConvertpointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
