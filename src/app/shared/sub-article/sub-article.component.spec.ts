import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubArticleComponent } from './sub-article.component';

describe('SubArticleComponent', () => {
  let component: SubArticleComponent;
  let fixture: ComponentFixture<SubArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
