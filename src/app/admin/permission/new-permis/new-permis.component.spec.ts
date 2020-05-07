import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPermisComponent } from './new-permis.component';

describe('NewPermisComponent', () => {
  let component: NewPermisComponent;
  let fixture: ComponentFixture<NewPermisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPermisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPermisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
