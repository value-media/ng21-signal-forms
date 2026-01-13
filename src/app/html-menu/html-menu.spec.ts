import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlMenu } from './html-menu';

describe('HtmlMenu', () => {
  let component: HtmlMenu;
  let fixture: ComponentFixture<HtmlMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
