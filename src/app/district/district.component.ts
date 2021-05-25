import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from '../_models/country.model';
import { District } from '../_models/district.model';
import { CountryService } from '../_services/country-service/country.service';
import { DistrictService } from '../_services/district-service/district.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {

  public districtObjs:Array<District> = new Array<District>();
  public addDistrictObj:District = new District();
  public viewDistrictObj:District = new District();
  public editDistrictObj:District = new District();
  public countryObjs:Array<Country> = new Array<Country>();

  countryDetails:Country = new Country();

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  constructor(private districtService:DistrictService, 
              private snackBar:MatSnackBar,
              private countryService:CountryService) { }

  ngOnInit(): void {

    this.districtService.getAllDistrict().subscribe(
      res =>{
        this.districtObjs = res;
      },
      err =>{
        console.log(err.error);
      }
    );
  }

  addDistrict(){
    const districtDto:any = {};
    districtDto.countryId = this.addDistrictObj.countryId;
    districtDto.code = this.addDistrictObj.code;
    districtDto.name = this.addDistrictObj.name;
    districtDto.laborRatePerHour = parseInt(this.addDistrictObj.laborRatePerHour);
    this.districtService.addDistrict(districtDto).subscribe(
      res =>{

        this.snackBar.open("District Added Successfully",'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['success-snackBar'],
 
        });
        this.ngOnInit();
      }
    );
  }



  getDistrictById(id:number){

    this.districtService.getDistrictById(id).subscribe(
      res =>{
        this.viewDistrictObj = res;

        this.countryService.getCountryById(this.viewDistrictObj.countryId).subscribe(
          res =>{
            this.countryDetails = res;
          },
          err =>{
            console.log(err.error);
          }
        );

      },
      err =>{
        console.log(err.error);
      }
    );

  }

  updateDistrictClicked(id:number){
    this.districtService.getDistrictById(id).subscribe(
      res =>{
        this.editDistrictObj = res;
        //this.getAllCountries();
        this.countryService.getCountryById(this.editDistrictObj.countryId).subscribe(
          res =>{
            console.log(res);
            this.countryDetails = res;
          },
          err =>{
             console.log(err.error);
          }
        );
      },
      err =>{
        console.log(err.error);
      }
    );
  }

  updateDistrict(id:number){

    const districtDto:any = {};
    districtDto.countryId =  parseInt(this.countryDetails.id);
    districtDto.code = this.editDistrictObj.code;
    districtDto.name = this.editDistrictObj.name;
    districtDto.laborRatePerHour = parseInt(this.editDistrictObj.laborRatePerHour);
    this.countryDetails= new Country();
    this.districtService.updateDistrict(id, districtDto).subscribe(
      res =>{
        this.snackBar.open("District Updated Successfully",'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['success-snackBar'],
 
        });
        this.ngOnInit();
      },
      err =>{
        console.log(err.error);
      }
    );
  }

  deleteDistrict(id:number){
    this.districtService.deleteDistrict(id).subscribe(
      res =>{
        this.districtObjs = res;

        this.snackBar.open("District Deleted Successfully",'Dismiss',{
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass:['red-snackBar'],
 
        });

      },
      err =>{
        console.log(err.error);
      }
    );
  }

  getAllCountries(){
    this.countryService.getAllCountries().subscribe(
      res =>{
            this.countryObjs = res;
      },
      err =>{
        console.log(err.error);
      }
    );
  }
  changeCountryHandler(event:any){
    //alert(event.target.value);
    this.addDistrictObj.countryId = parseInt(event.target.value);
  }

}
