import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestControlsComponent } from './test-controls.component';

describe('TestControlsComponent', () => {
  let component: TestControlsComponent;
  let fixture: ComponentFixture<TestControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
