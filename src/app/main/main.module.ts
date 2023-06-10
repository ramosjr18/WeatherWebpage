import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { WeatherInfoMainPageComponent } from './pages/weather-info-main-page/weather-info-main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherImgPipe } from './pipes/weather-img.pipe';

import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { MainCardComponent } from './components/main-card/main-card.component';
import { ThreeDayForecastComponent } from './components/three-day-forecast/three-day-forecast.component';
import { FiveDayForecastComponent } from './components/five-day-forecast/five-day-forecast.component';
import { TeamComponent } from './pages/team-page/team.component';
import { TechComponent } from './pages/tech/tech.component';
import { NavbarComponent } from './components/nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    WeatherInfoMainPageComponent,
    WeatherImgPipe,
    AboutPageComponent,
    ContactPageComponent,
    MainCardComponent,
    ThreeDayForecastComponent,
    FiveDayForecastComponent,
    TeamComponent,
    TechComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, MainRoutingModule, HttpClientModule, SharedModule],
})
export class MainModule {}
