import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordcomponetComponent } from './dashbordcomponet.component';

describe('DashbordcomponetComponent', () => {
  let component: DashbordcomponetComponent;
  let fixture: ComponentFixture<DashbordcomponetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordcomponetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashbordcomponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
