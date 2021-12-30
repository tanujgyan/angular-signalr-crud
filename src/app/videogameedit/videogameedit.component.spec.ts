import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogameeditComponent } from './videogameedit.component';

describe('VideogameeditComponent', () => {
  let component: VideogameeditComponent;
  let fixture: ComponentFixture<VideogameeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideogameeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogameeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
