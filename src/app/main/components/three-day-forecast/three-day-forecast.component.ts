import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-three-day-forecast',
  templateUrl: './three-day-forecast.component.html',
  styles: [],
})
export class ThreeDayForecastComponent {
  @Input() timelineForOneDay: any;
  @Input() isCelcius: any;
}
