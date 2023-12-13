import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Video {
  id:number,
  src: string;
  title: string;
  description: string;
  thumbnail: string;
  //posterUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private videoData: Video[] = [
    { id:1,src: './assets/video/1.mp4', title: 'Video 1 Title', description: 'Description for Video 1.',thumbnail: 'thumbnail1.jpg' }, 
    { id:2,src: './assets/video/2.mp4', title: 'Video 2 Title', description: 'Description for Video 2.', thumbnail: 'thumbnail1.jpg' },
    { id:3,src: './assets/video/3.mp4', title: 'Video 3 Title', description: 'Description for Video 3.',thumbnail: 'thumbnail1.jpg' },
    { id:4,src: './assets/video/4.mp4', title: 'Video 4 Title', description: 'Description for Video 4.',thumbnail: 'thumbnail1.jpg' },
    { id:5,src: './assets/video/4.mp4', title: 'Video 5 Title', description: 'Description for Video 5.',thumbnail: 'thumbnail1.jpg' },
    { id:6,src: './assets/video/4.mp4', title: 'Video 6 Title', description: 'Description for Video 6.' , thumbnail: 'thumbnail1.jpg'},
    { id:7,src: './assets/video/4.mp4', title: 'Video 7 Title', description: 'Description for Video 7.' , thumbnail: 'thumbnail1.jpg'},
    { id:8,src: './assets/video/4.mp4', title: 'Video 8 Title', description: 'Description for Video 8.',thumbnail: 'thumbnail1.jpg' },

  ];
    getVideoData(): Video[] {
      return this.videoData; 
  }

  getVideoById(id: number): Video | undefined {
    return this.videoData.find(video => video.id === id);
 }
}

