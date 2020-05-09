import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { NavHeaderComponent } from './view/dashboard/nav-header/nav-header.component';
import { LeftPieComponent } from './view/dashboard/left-pie/left-pie.component';
import { LeftCurveComponent } from './view/dashboard/left-curve/left-curve.component';
import { LeftBarComponent } from './view/dashboard/left-bar/left-bar.component';
import { MidMapComponent } from './view/dashboard/mid-map/mid-map.component';
import { ActiveDateComponent } from './view/dashboard/active-date/active-date.component';
import { RightLocalComponent } from './view/dashboard/right-local/right-local.component';
import { RightUserComponent } from './view/dashboard/right-user/right-user.component';
import { PipeModule } from './pipe/pipe.module'
import { GenderCalcPercentPipe } from './pipe/gender-calc-percent.pipe'
import { DashboardService } from './api/dashboard.service'
import { from } from 'rxjs'
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavHeaderComponent,
    LeftPieComponent,
    LeftCurveComponent,
    LeftBarComponent,
    MidMapComponent,
    ActiveDateComponent,
    RightLocalComponent,
    RightUserComponent,
    GenderCalcPercentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule,
    HttpClientModule,
    PipeModule
  ],
  providers: [
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
