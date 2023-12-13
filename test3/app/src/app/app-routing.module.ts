import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video/video.component'; // Adjust the import
import { BlankVideoPlayerComponent } from './blank-video-player/blank-video-player.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: 'video', component: VideoComponent }, // Adjust the path
  { path: 'video-player/:id', component: BlankVideoPlayerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Example home route
  //{ path: '', pathMatch: 'full', component: UserLoginComponent },
  { path: 'user -login', component: UserLoginComponent },
  { path: '', redirectTo: '/video ', pathMatch: 'full' },
  { path: '', component: AppComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
