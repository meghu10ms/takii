import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppVersionComponent } from './new-app-version.component';

describe('NewAppVersionComponent', () => {
  let component: NewAppVersionComponent;
  let fixture: ComponentFixture<NewAppVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAppVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
