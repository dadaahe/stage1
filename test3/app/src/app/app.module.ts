import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { VideoComponent } from './video/video.component';
import { VideoService } from './video.service';
import { BlankVideoPlayerComponent } from './blank-video-player/blank-video-player.component';import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { SidePannelComponent } from './side-pannel/side-pannel.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    VideoComponent,
    BlankVideoPlayerComponent,
    UserLoginComponent,
    SidePannelComponent,
    
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],

  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
