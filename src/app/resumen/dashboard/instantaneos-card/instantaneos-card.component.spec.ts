import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantaneosCardComponent } from './instantaneos-card.component';

describe('InstantaneosCardComponent', () => {
  let component: InstantaneosCardComponent;
  let fixture: ComponentFixture<InstantaneosCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantaneosCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantaneosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
