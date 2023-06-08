import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MyWeatherService {
  private baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = 'bb3a234039078f99acd82d0fce2f1c34';

  constructor(public http: HttpClient) {}

  // ! new way

  getWeatherByCityName(nameOfCity: string, unit:String) {
    const url = `${this.baseUrl}?q=${nameOfCity}&appid=${this.apiKey}&units=${unit}`;
    return this.http.get(url);
  }

  getWeatherByGeoLocation(lat: number, lon: number, unit: string) {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${unit}`;

    return this.http.get(url);
  }
}

// // * method to generate weather
// getWeatherForecast() {
//   return new Observable((observer) => {
//     // * The Geolocation.getCurrentPosition() method is used to get the current position of the device.
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         // * position here will return the coordinates.
//         observer.next(position);
//         console.log('POSITION', position);
//       },
//       (err) => {
//         observer.next(err);
//       }
//     );
//   }).pipe(
//     // * in map we transform data. we need to append query parameters.
//     map((val: any) => {
//       // * remember you have already seen httpParams with fer!
//       return (
//         new HttpParams()
//           .set('lon', val.coords.longitude)
//           .set('lat', val.coords.latitude)
//           .set('units', 'metric')
//           // TODO: MAKE API KEY PRIVATEEEEEEE!!!!!!!!!!!!
//           .set('appid', 'bb3a234039078f99acd82d0fce2f1c34')
//         // .set('q', `${city}`)
//       );
//     }),
//     tap((x) => {
//       console.log('TAP HERE queryParams: ', x);
//     }),
//     // * switchMap will be used to fetch the data and pass it to the get method of the http:
//     switchMap((values) => {
//       return this.http.get(
//         'https://api.openweathermap.org/data/2.5/forecast',
//         { params: values }
//       );
//     }),
//     tap((x) => {
//       console.log('TAP HERE apiResponse: ', x);
//     })
//   );
// }

// // !METHOD X
// getWeatherByCity(city: string): Observable<WeatherApiInterface | undefined> {
//   const type: string = 'forecast';
//   return this.http
//     .get<WeatherApiInterface>(
//       `${this.baseUrl}/${type}?q=${city}&appid=${environment.APIKEY}&units=metric`
//     )
//     .pipe(
//       catchError((err) => {
//         return of(undefined);
//       })
//     );
// }
