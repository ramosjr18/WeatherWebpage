import { Component, OnInit } from '@angular/core';
import { MyWeatherService } from '../../services/my-weather.service';

@Component({
  selector: 'app-weather-info-main-page',
  templateUrl: './weather-info-main-page.component.html',
  styles: [],
})
export class WeatherInfoMainPageComponent implements OnInit {
  // ! ATTRIBUTES:
  // * timeline array will hold the time and corresponding temperature for the whole day (that means, 8 different forecasts, because it is every three hours. 8*3 = 24):
  timelineForOneDay: any = [];
  weatherNow: any;
  // * current time will return time and date of laptop:
  currentTime = new Date();
  // * holds city and location:
  location: any;
  latitude?: number;
  longitude?: number;
  weatherData: any;
  fetched5dayWeatherData: any = [];
  HumidityDesc!: string;
  unit?: string;
  // TODO: show error message for when city not found.

  // ! CONSTRUCTOR:
  constructor(public myWeatherService: MyWeatherService) {}

  // ! ON INIT:
  // * checking if geolocation is possible by browser:

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.unit = 'metric';
        console.log(
          `Latitude: ${this.latitude}, Longitude: ${this.longitude}, Unit: ${this.unit}`
        );

        // * passing in geo parameters to getWeatherByGeoLocation method:

        this.myWeatherService
          .getWeatherByGeoLocation(this.latitude, this.longitude, this.unit)
          .subscribe((data) => {
            console.log('data from ngOnInit => ', data);
            this.weatherData = data;
            this.getTodayForecast(this.weatherData);
            this.getFiveDayForecast(this.weatherData.list);
            // * ! from list you get weather of every three hours
          });
      });
    } else {
      console.log('This browser does not support geolocation.');
    }
  }

  // ! METHODS:
  // * to compare:
  dateRange() {
    // * it will always return a range between 2 dates, that have a difference of 3 hours -1sec: 2:59
    const start = new Date();
    start.setHours(start.getHours() + start.getTimezoneOffset() / 60);
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);
    return { start, to };
  }

  // *the following method is to get the data stored in ngOnInit, it is then called inside the init with data passed in as parameter:

  getTodayForecast(info: any) {
    this.location = info.city;
    // ! list is three hour forecast:
    // * we'll look through the list and slice the data so we can get just the first 8 elements (8 elements because it has the weather for every three hours and well 8 * 3 = 24, and we are looking for *read function name):
    for (const forecast of info.list.slice(0, 7)) {
      console.log('forecast =>', forecast);
      // * here we are pushing specific info from  list into timelineForOneDay:

      this.timelineForOneDay.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp,
        icon: forecast.weather![0].icon,
        conditions: forecast.weather![0].main,
      });

      // * this const is assigned the dates provided to us by api, and then we'll change it to a timestamp:

      const apiDate = new Date(forecast.dt_txt).getTime();

      // * if our time(within our current computer time) is within 3 hours of the time provided by us by the api

      if (
        this.dateRange().start.getTime() <= apiDate &&
        this.dateRange().to.getTime() >= apiDate
      ) {
        // * if these two conditions satisfy, then we will assign data to property called weatherNow(line 13):

        this.weatherNow = forecast;
        console.log('weather now => ', this.weatherNow);
      }
    }
  }

  // * this is for when you manually look for a city:
  searchByCity(city: string) {
    console.log('capital being searched: ', city);

    this.myWeatherService.getWeatherByCityName(city).subscribe({
      next: (data) => {
        this.weatherData = data;

        console.log('fetched info =>', data);
        // * in order to set values to "blank" again (because they where already populated on ng on init!!!):
        // this.weatherNow = false;
        this.timelineForOneDay = [];
        this.fetched5dayWeatherData = [];

        this.getTodayForecast(this.weatherData);

        this.getFiveDayForecast(this.weatherData.list);
      },
      // error: (err) => {
      //   return this.showErrorHandler();
      // },
    });
  }

  getFiveDayForecast(info: any) {
    for (let i = 0; i < info.length; i = i + 8) {
      this.fetched5dayWeatherData.push(info[i]);
    }

    console.log(
      'five day forecast array with data => ',
      this.fetched5dayWeatherData
    );
  }

  // ! ---??-----
  getHumidityDesc() {
    const humidity = this.weatherNow.main.humidity;
    const messageElement = document.getElementById('humidity');
    if (messageElement) {
      if (humidity < 30) {
        messageElement.textContent = 'Humidity is low.';
      } else if (humidity >= 30 && humidity <= 70) {
        messageElement.textContent = 'Humidity is moderate.';
      } else {
        messageElement.textContent = 'Humidity is high.';
      }
    }
  }

  getWindDesc() {
    const wind = this.weatherNow.wind.speed;
    const messageElement = document.getElementById('wind');
    if (messageElement) {
      if (wind < 10) {
        messageElement.textContent = 'Wind is calm.';
      } else if (wind >= 10 && wind <= 20) {
        messageElement.textContent = 'Wind is light.';
      } else {
        messageElement.textContent = 'Wind is strong.';
      }
    }
  }

  getFeelDesc() {
    const feels = this.weatherNow.main.feels_like;
    const messageElement = document.getElementById('feels');
    if (messageElement) {
      if (feels < 10) {
        messageElement.textContent = 'Feels very cold.';
      } else if (feels >= 10 && feels < 20) {
        messageElement.textContent = 'Feels cool.';
      } else if (feels >= 20 && feels < 30) {
        messageElement.textContent = 'Feels warm.';
      } else {
        messageElement.textContent = 'Feels hot.';
      }
    }
  }

  getVisibilityDesc() {
    const visibility = this.weatherNow.visibility;
    const messageElement = document.getElementById('visibility');
    if (messageElement) {
      if (visibility < 1) {
        messageElement.textContent = 'Visibility is very low.';
      } else if (visibility >= 1 && visibility < 5) {
        messageElement.textContent = 'Visibility is low.';
      } else if (visibility >= 5 && visibility < 10) {
        messageElement.textContent = 'Visibility is moderate.';
      } else {
        messageElement.textContent = 'Visibility is high.';
      }
    }
  }

  // switchToCelcius(){
  //   this.unit = 'metric';
  //   console.log('this is the unit',this.unit, 'metric')

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.unit = 'metric';
  //       console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}, Unit: ${this.unit}`);

  //       this.myWeatherService
  //         .getWeatherByGeoLocation(this.latitude, this.longitude, this.unit)
  //         .subscribe((data) => {
  //           console.log('data from ngOnInit => ', data);
  //           this.weatherData = data;
  //           this.getTodayForecast(this.weatherData);
  //           this.getFiveDayForecast(this.weatherData.list);
  //         });
  //     });
  //   } else {
  //     console.log('This browser does not support geolocation.');
  //   }
  //   const element = document.getElementById("faren")!;
  //   const element2 = document.getElementById("celcius")!;
  //   element.style.backgroundColor = "rgba(72, 49, 157, 0.2)";
  //   element2.style.backgroundColor = "#49319D";
  // }

  // switchToFarenheit(){
  //   // navigator.geolocation.getCurrentPosition((position)=>{
  //   //   this.latitude = position.coords.latitude
  //   //   this.longitude = position.coords.longitude
  //   //   this.myWeatherService.getWeatherByGeoLocation(this.latitude, this.longitude, "imperial")
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.unit = 'imperial';

  //       console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}, Unit: ${this.unit}`);

  //       this.myWeatherService
  //         .getWeatherByGeoLocation(this.latitude, this.longitude, this.unit)
  //         .subscribe((data) => {
  //           console.log('data from ngOnInit => ', data);
  //           this.weatherData = data;
  //           this.getTodayForecast(this.weatherData);
  //           this.getFiveDayForecast(this.weatherData.list);
  //         });
  //     });
  //   } else {
  //     console.log('This browser does not support geolocation.');
  //   }
  //   console.log('this is the unit',this.unit, 'faren');
  //   const element = document.getElementById("faren")!;
  //   const element2 = document.getElementById("celcius")!;
  //   element.style.backgroundColor = "#49319D";
  //   element2.style.backgroundColor = "rgba(72, 49, 157, 0.2)";
  // }
}
