import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherInfoMainPageComponent } from '../pages/weather-info-main-page/weather-info-main-page.component';

@Injectable({
  providedIn: 'root',
})
export class MyWeatherService {
  private baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = 'bb3a234039078f99acd82d0fce2f1c34';

  constructor(public http: HttpClient) { }

  // ! new way

  getWeatherByCityName(nameOfCity: string, unit: string) {
    const url = `${this.baseUrl}?q=${nameOfCity}&appid=${this.apiKey}&units=${unit}`;
    return this.http.get(url);
  }

  getWeatherByGeoLocation(lat: number, lon: number, unit: string) {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${unit}`;

    return this.http.get(url);
  }

  fetchdata() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${this.apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Assuming the weatherNow object represents the current weather
        const weatherNow = data.list[0];

        // Extract the weather code
        const weatherCode = weatherNow.weather[0].main;

        // Use the weather code to change the background
        this.changeBackground(weatherCode);
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
      });

  }


  changeBackground(weatherCode:any) {
    const body = document.body;

    // Reset the background color
    body.className = 'condition1';

    if (weatherCode >= 200 && weatherCode < 300) {
      body.className = 'condition2';
    } else if (weatherCode >= 300 && weatherCode < 600) {
      body.className = 'condition0';
    } else if (weatherCode >= 600 && weatherCode < 700) {
      body.className = 'condition0';
    } else if (weatherCode >= 700 && weatherCode < 800) {
      body.className = 'condition1';
    } else if (weatherCode === 800) {
      body.className = 'condition3';
    } else if (weatherCode > 800 && weatherCode < 900) {
      body.className = 'condition4';
    } else {
      body.className = 'condition0';
    }
  }

}
