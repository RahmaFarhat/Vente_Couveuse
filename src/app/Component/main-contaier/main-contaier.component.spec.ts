import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContaierComponent } from './main-contaier.component';

describe('MainContaierComponent', () => {
  let component: MainContaierComponent;
  let fixture: ComponentFixture<MainContaierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContaierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainContaierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
