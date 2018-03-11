import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductslistComponent } from './productslist.component';

describe('ProductslistComponent', () => {
  let component: ProductslistComponent;
  let fixture: ComponentFixture<ProductslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
