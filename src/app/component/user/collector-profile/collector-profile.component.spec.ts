import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorProfileComponent } from './collector-profile.component';

describe('CollectorProfileComponent', () => {
  let component: CollectorProfileComponent;
  let fixture: ComponentFixture<CollectorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectorProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
