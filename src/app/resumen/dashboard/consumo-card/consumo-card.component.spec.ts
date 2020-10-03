import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoCardComponent } from './consumo-card.component';

describe('ConsumoCardComponent', () => {
  let component: ConsumoCardComponent;
  let fixture: ComponentFixture<ConsumoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
