import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankVideoPlayerComponent } from './blank-video-player.component';

describe('BlankVideoPlayerComponent', () => {
  let component: BlankVideoPlayerComponent;
  let fixture: ComponentFixture<BlankVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlankVideoPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlankVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
