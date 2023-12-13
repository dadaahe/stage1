import { Component, OnInit , Input,Renderer2,Output, EventEmitter} from '@angular/core';
import { VideoService as VideoServiceImport, Video as VideoType } from '../video.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';



interface Video {
  id: number;
  src: string;
  title: string;
  description: string;
  thumbnail:string;
 // posterUrl: string;
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements OnInit {
 // @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  videoData: Video[] = [
    {
      id: 1,
      title: 'Video 1',
      description: 'Description 1',
      src: 'assets/video/1.mp4',
      thumbnail: 'thumbnail1.jpg'
     // posterUrl: 'path/to/poster1.jpg'
    },
    {
      id: 2,
      title: 'Video 2',
      description: 'Description 2',
      src: 'path/to/video2.mp4',
      thumbnail: 'thumbnail1.jpg'
      //posterUrl: 'path/to/poster2.jpg'
    },
  ];
    
  isVideoModalOpen = false;
  currentVideo: any = null;

  selectedVideo: Video | undefined;
  @Input() videoUrl!: string; // Using definite assignment assertion

  @Input() posterUrl!: string; // Add this line for the poster image URL

  @Output() closeModal = new EventEmitter<void>();

  constructor( private location: Location,private videoService: VideoServiceImport, private router: Router,private sanitizer: DomSanitizer, private renderer: Renderer2) {
    (window as any).goBack = this.goBack.bind(this);
  }
  private videoPlayer: HTMLVideoElement | undefined;

  
  ngOnInit() {
    this.videoData = this.videoService.getVideoData();
    const video = this.videoService.getVideoData()[0]; // Replace with your logic to get the video
    const videoSrc = video.src;
    this.videoPlayer = document.createElement('video');
    document.body.appendChild(this.videoPlayer);

    
    this.generatePoster(videoSrc)
    .then(posterUrl => {
      console.log('Generated poster URL:', posterUrl);

    
    })
    .catch(error => {
      console.error('Error generating poster:', error);
    });
  }
 

  generatePoster(videoSrc: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Create a video element to capture the first frame
      const video = document.createElement('video');
      video.src = videoSrc;
  
      // Append the video element to the body
      document.body.appendChild(video);
  
      // Listen for the loadedmetadata event to ensure video dimensions are available
      video.addEventListener('loadedmetadata', () => {
        // Create a canvas to draw the first frame
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
  
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        // Convert the canvas content to a data URL
        const dataUrl = canvas.toDataURL('image/png');
  
        // Remove the video element from the DOM
        document.body.removeChild(video);
  
        // Resolve the Promise with the sanitized data URL
        resolve(this.sanitizer.bypassSecurityTrustUrl(dataUrl));
      });
  
      // Handle video load error
      video.addEventListener('error', (error) => {
        console.error('Error loading video:', error);
        // Remove the video element from the DOM in case of an error
        document.body.removeChild(video);
        reject(error);
      });
    });
  }
  



  openVideoPlayer(videoId: number): void {
    console.log(`Opening video player for video with ID: ${videoId}`);
  
    const video = this.videoData.find(video => video.id === videoId);
  
    if (video) {
      this.currentVideo = video;
      this.isVideoModalOpen = true;
      const videoSrc = video.src;
  
      if (this.videoPlayer) {
        // Pause and remove the existing video player
        this.videoPlayer.pause();
        this.videoPlayer.src = '';
        this.videoPlayer.addEventListener('canplay', () => {
          this.videoPlayer!.play();
        });
      }
  
      // Set the new video source
      if (this.videoPlayer) {
        this.videoPlayer.src = videoSrc;
        this.videoPlayer.play();
      }
  
      // Use Angular Router to navigate back
      this.router.navigate(['/home']);  // Replace '/' with the actual path you want to navigate to
  
      // Create a new document
      const newDocument = document.open();

    //  const backgroundColor = getVideoBackgroundColor(videoSrc);
    //  const arrowColor = getContrastColor(backgroundColor);
  
      // Write the HTML content
      newDocument.write(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Player</title>
  </head>
  <body style="margin: 0; overflow: hidden;">
    <div style="position: relative;">
      <video controls style="width: 100vw; height: 100vh;" poster="${videoSrc}">
        <source src="${videoSrc}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <a href="javascript:void(0);" style="position: absolute; top: 10px; left: 10px; font-size: 24px; text-decoration: none; color: black;" onclick="navigateBack();">&#8592; Back</a>
    </div>
    <script>
      const video = document.querySelector('video');
      video.addEventListener('loadedmetadata', function() {
        // Use the first frame as the poster
        video.poster = 'data:image/png;base64,' + captureVideoFrame(video);
      });

      function captureVideoFrame(video) {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');
      }

      function navigateBack() {
        // Use Angular Router to navigate back
        window.angularComponentReference.goBack();
      }
    </script>
  </body>
  </html>
`);
 
      // Close the new document
      newDocument.close();
    } else {
      console.error('Video not found with ID: ', videoId);
    }
  }

  goBack(): void {
    this.location.back();
  }

  closeVideoModal(): void {
    this.isVideoModalOpen = false;
    this.currentVideo = null;
  }

  
}
