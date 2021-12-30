import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideogamelistComponent } from './videogamelist.component';

describe('VideogamelistComponent', () => {
  let component: VideogamelistComponent;
  let fixture: ComponentFixture<VideogamelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideogamelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideogamelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
