import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockStatViewComponent } from './block-stat-view.component';

describe('BlockStatViewComponent', () => {
  let component: BlockStatViewComponent;
  let fixture: ComponentFixture<BlockStatViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockStatViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockStatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
