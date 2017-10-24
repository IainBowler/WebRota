import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRotaComponent } from './my-rota.component';

describe('MyRotaComponent', () => {
  let component: MyRotaComponent;
  let fixture: ComponentFixture<MyRotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
