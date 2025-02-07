import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionAddComponent } from './collection-add.component';

describe('CollectionAddComponent', () => {
  let component: CollectionAddComponent;
  let fixture: ComponentFixture<CollectionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
