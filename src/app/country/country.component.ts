import { Component, OnInit } from '@angular/core';
import { Country } from '../_models/country.model';
import { CountryService } from '../_services/country-service/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  public countryObjs:Array<Country> = new Array<Country>();
  public countryObj:Country = new Country();

  constructor(private countryService:CountryService) { }

  ngOnInit(): void {

    this.countryService.getAllCountries().subscribe(
          res =>{
            console.log(res);
            this.countryObjs = res;
          },
          err =>{
            console.log(err.error);
          }
        )
  }

}
