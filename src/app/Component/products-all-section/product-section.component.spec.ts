import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSectionComponent } from './product-section.component';

describe('ProductSectionComponent', () => {
  let component: ProductSectionComponent;
  let fixture: ComponentFixture<ProductSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
