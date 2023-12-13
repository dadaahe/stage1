
import { Component, OnInit , AfterViewInit, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService, Video } from '../video.service';

@Component({
  selector: 'app-blank-video-player',
  templateUrl: './blank-video-player.component.html',
  styleUrls: ['./blank-video-player.component.scss']
})
export class BlankVideoPlayerComponent implements OnInit {
  video: Video | undefined;

  constructor(private route: ActivatedRoute, private videoService: VideoService,private elementRef: ElementRef) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const videoId = +params['id'];
      this.video = this.videoService.getVideoById(videoId);
    });
  }
  
}