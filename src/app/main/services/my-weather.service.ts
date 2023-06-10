import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MyWeatherService {
  private baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = 'bb3a234039078f99acd82d0fce2f1c34';

  constructor(public http: HttpClient) {}

  // ! new way

  getWeatherByCityName(nameOfCity: string) {
    const url = `${this.baseUrl}?q=${nameOfCity}&appid=${this.apiKey}&units=imperial,metric`;
    return this.http.get(url);
  }

  getWeatherByGeoLocation(lat: number, lon: number, unit: string) {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${unit}`;

    return this.http.get(url);
  }
}
