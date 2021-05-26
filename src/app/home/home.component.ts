import { Component, OnInit } from '@angular/core';
import { CountryService } from '../_services/country-service/country.service';
import { DistrictService } from '../_services/district-service/district.service';
import { LaborService } from '../_services/labor-service/labor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countryCount:any;
  districtCount:any;
  laborCount:any;

  constructor(private countryService:CountryService,
              private districtService:DistrictService,
              private laborService:LaborService) { }

  ngOnInit(): void {

      this.countryService.countCountry().subscribe(
        res =>{
         this.countryCount = res;
        },
        err =>{
          console.log(err);
        }
      );

      this.districtService.countDistrict().subscribe(
        res =>{
            this.districtCount = res;
        },
        err =>{
          console.log(err);
        }
      );

      this.laborService.countLabor().subscribe(
        res =>{
          this.laborCount = res;
        },
        err =>{
          console.log(err);
        }
      );
  }

}
