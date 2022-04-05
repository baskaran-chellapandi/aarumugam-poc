import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdialogueComponent } from './postdialogue.component';

describe('PostdialogueComponent', () => {
  let component: PostdialogueComponent;
  let fixture: ComponentFixture<PostdialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostdialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostdialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
