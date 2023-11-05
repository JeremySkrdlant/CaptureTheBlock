import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourTokensComponent } from './your-tokens.component';

describe('YourTokensComponent', () => {
  let component: YourTokensComponent;
  let fixture: ComponentFixture<YourTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourTokensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
