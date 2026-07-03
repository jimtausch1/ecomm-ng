import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class ShopformService {
  private countriesUrl: string = 'http://localhost:8080/api/countries';
  private statesUrl: string = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) {}

  getCreditCardYears(): Observable<number[]> {
    // Implementation for getting credit card years
    const currentYear: number = new Date().getFullYear();
    const endYear: number = currentYear + 10;
    const years: number[] = [];
    for (let year = currentYear; year <= endYear; year++) {
      years.push(year);
    }
    return of(years);
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    // Implementation for getting credit card months
    const months: number[] = [];
    for (let month = startMonth; month <= 12; month++) {
      months.push(month);
    }
    return of(months);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map((response) => response._embedded.countries));
  }

  getStates(theCountryCode: string): Observable<State[]> {
    const url = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient
      .get<GetResponseStates>(url)
      .pipe(map((response) => response._embedded.states));
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
