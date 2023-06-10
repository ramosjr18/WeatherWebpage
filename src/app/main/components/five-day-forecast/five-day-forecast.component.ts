import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styles: [],
})
export class FiveDayForecastComponent {
  @Input() fetched5dayWeatherData: any;
  @Input() isCelcius: any;
}
