import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanalCardComponent } from './semanal-card.component';

describe('SemanalCardComponent', () => {
  let component: SemanalCardComponent;
  let fixture: ComponentFixture<SemanalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
