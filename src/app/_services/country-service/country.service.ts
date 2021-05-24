import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/_models/country.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  getAllCountries():Observable<any>{
      return this.http.get(environment.apiUrl + 'Country', {responseType:'json'});
  }
  addCountry(country:Country){
    return this.http.post(environment.apiUrl + 'Country', country, {responseType:'json'});
  }
}
