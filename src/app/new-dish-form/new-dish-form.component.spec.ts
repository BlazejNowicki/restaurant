import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDishFormComponent } from './new-dish-form.component';

describe('NewDishFormComponent', () => {
  let component: NewDishFormComponent;
  let fixture: ComponentFixture<NewDishFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDishFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
