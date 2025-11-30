import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {myTrainingRoutingModule} from "./my-training-routing.module";
import {CommonModule} from "@angular/common";
import {SwiperModule} from "swiper/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { MainCoursesComponent } from './pages/courses/main-courses/main-courses.component';
import { MainRoadmapComponent } from './pages/roadmap/main-roadmap/main-roadmap.component';
import { FilterCoursesComponent } from './pages/courses/components/filter-courses/filter-courses.component';
import { ItemCoursesComponent } from './pages/courses/components/item-courses/item-courses.component';
import { MainRecordsComponent } from './pages/records/main-records/main-records.component';
import { DetailCoursesComponent } from './pages/courses/components/detail-courses/detail-courses.component';
import {LikeComponent} from "../../components/like/like.component";
import {EnteringClassComponent} from "../../components/entering-class/entering-class.component";
import {NzTimelineComponent, NzTimelineItemComponent} from "ng-zorro-antd/timeline";
import {StatusRecordComponent} from "./pages/components/status-record/status-record.component";
import {VideoPlayerComponent} from "../../components/video-player/video-player.component";

@NgModule({
  declarations: [

    MainCoursesComponent,
    MainRoadmapComponent,
    FilterCoursesComponent,
    ItemCoursesComponent,
    MainRecordsComponent,
    DetailCoursesComponent
  ],
  imports: [
    CommonModule,
    myTrainingRoutingModule,
    HttpClientModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LikeComponent,
    EnteringClassComponent,
    NzTimelineComponent,
    NzTimelineItemComponent,
    StatusRecordComponent,
    VideoPlayerComponent,
  ],
})
export class MyTrainingModule {
}
