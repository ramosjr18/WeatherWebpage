import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  // Fetch weather data from the API
  fetchWeatherData() {

    // Make an HTTP request to the API endpoint
    fetch(this.baseUrl)
      .then(response => response.json())
      .then(data => {
        // Extract the weather condition or code from the data
        const weatherCode = data.list[0].weather[0].id;

        // Determine the background image URL based on the weather code
        const imageUrl = this.getBackgroundImageUrl(weatherCode);

        // Update the background dynamically
        document.body.style.backgroundImage = `url(../src/assets/images/wea/${imageUrl})`;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }

  // Mapping of weather codes to background image URLs
  getBackgroundImageUrl(weatherCode: any) {
    // Add your logic here to associate weather codes with specific image URLs
    if (weatherCode >= 200 && weatherCode < 300) {
      return 'thunderstorm.jpg';
    } else if (weatherCode >= 300 && weatherCode < 600) {
      return 'rainy.jpg';
    } else if (weatherCode >= 600 && weatherCode < 700) {
      return 'snowy.jpg';
    } else if (weatherCode >= 700 && weatherCode < 800) {
      return 'mist.jpg';
    } else if (weatherCode === 800) {
      return 'clear.jpg';
    } else if (weatherCode > 800 && weatherCode < 900) {
      return 'cloudy.jpg';
    } else {
      return 'default.jpg';
    }
  }


}
