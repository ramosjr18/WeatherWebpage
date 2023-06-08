import { Component} from '@angular/core';
import { WeatherInfoMainPageComponent } from 'src/app/main/pages/weather-info-main-page/weather-info-main-page.component';
import { MyWeatherService } from 'src/app/main/services/my-weather.service';

@Component({
  selector: 'nav-bar-page',
  templateUrl: './nav-bar.component.html',
  styles: [
  ]
})
export class NavbarComponent {

  constructor(
    public myWeatherService: MyWeatherService,
    private Weather: WeatherInfoMainPageComponent
  ) {}

  searchByCity(city: string, unit: string) {
    console.log('capital being searched: ', city);
    this.myWeatherService.getWeatherByCityName(city, unit).subscribe((data) => {
      this.Weather.weatherData = data;

      console.log('fetched info =>', data);
      this.Weather.weatherNow = false;
      this.Weather.timelineForOneDay = [];
      this.Weather.fetched5dayWeatherData = [];

      this.Weather.getTodayForecast(this.Weather.weatherData);

      this.Weather.getFiveDayForecast(this.Weather.weatherData.list);
    });
  }

}