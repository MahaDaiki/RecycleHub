import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCollectComponent } from './city-collect.component';

describe('CityCollectComponent', () => {
  let component: CityCollectComponent;
  let fixture: ComponentFixture<CityCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityCollectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
