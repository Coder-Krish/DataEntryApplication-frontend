import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from '../_models/country.model';
import { District } from '../_models/district.model';
import { Labor } from '../_models/labor.model';
import { CountryService } from '../_services/country-service/country.service';
import { DistrictService } from '../_services/district-service/district.service';
import { LaborService } from '../_services/labor-service/labor.service';

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styleUrls: ['./labor.component.css']
})
export class LaborComponent implements OnInit {

  
  public laborObjs:Array<Labor> = new Array<Labor>();
  public addLaborObj:Labor = new Labor();
  public viewLaborObj:Labor = new Labor();
  public editLaborObj:Labor = new Labor();
  public countryObjs:Array<Country> = new Array<Country>();
  public districtObj:District = new District();
  public districtObjs:Array<District> = new Array<District>();
  districtId:any;

  countryDetails:any;
  districtDetails:any;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  totalRecords : number;
  page: number = 1;

  searchResult:any;


  constructor(private laborService:LaborService,
              private snackBar:MatSnackBar,
              private countryService:CountryService,
              private districtService:DistrictService) { }

  ngOnInit(): void {

    this.laborService.getAllLabors().subscribe(
      res =>{
            this.laborObjs = res;
            //console.log(this.laborObjs.length);
            for(let i =0; i< this.laborObjs.length; i++){
                this.districtId = this.laborObjs[i].districtId;
                this.districtService.getDistrictById(this.districtId).subscribe(
                  res =>{
                      this.laborObjs[i].district= res;
                  },
                  err =>{
                    console.log(err);
                  }
                );
            }
           
      },
      err =>{
        console.log(err.error);
      }
    );

  }

  addLabor(){

    const laborDto:any = {};
    laborDto.laborName = this.addLaborObj.laborName;
    laborDto.taskDetail = this.addLaborObj.taskDetail;
    laborDto.workHours = parseInt(this.addLaborObj.workHours);
    laborDto.districtId = this.addLaborObj.districtId;
    this.laborService.addLabor(laborDto).subscribe(
        (res:any) =>{
          this.addLaborObj= new Labor();
          this.snackBar.open("Labor Added Successfully",'Dismiss',{
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass:['success-snackBar'],
   
          });

          this.ngOnInit();
            
          },
          err =>{
            console.log(err);
          }
        
    );

  }



  getLaborById(id:number){

    this.laborService.getLaborById(id).subscribe(
      res =>{
        //console.log(res);
        this.viewLaborObj = res[0];
       // console.log(this.viewLaborObj);
        this.districtService.getDistrictById(this.viewLaborObj.districtId).subscribe(
          res =>{
            this.viewLaborObj.district = res.name;
            this.countryService.getCountryById(res.countryId).subscribe(
              res =>{
                this.viewLaborObj.country = res.name;
              },
              err =>{
                console.log(err);
              }
            );
          },
          err =>{
            console.log(err);
          }
        );

      },
      err =>{
        console.log(err);
      }
    );
  }

  updateLaborClicked(id:number){
      this.laborService.getLaborById(id).subscribe(
        res =>{
          this.editLaborObj = res[0];

          this.districtService.getDistrictById(this.editLaborObj.districtId).subscribe(
            res =>{
              this.editLaborObj.district = res;
              this.districtDetails= res.name;

              this.countryService.getCountryById(res.countryId).subscribe(
                res =>{
                  this.editLaborObj.country = res;
                  this.countryDetails = res.name;

                },
                err =>{
                  console.log(err);
                }
              );
            },
            err =>{
              console.log(err);
            }
          );

        },
        err =>{
          console.log(err);
        }
      );
  }

  updateLabor(id:number){

    const laborDto:any={};
    laborDto.districtId = parseInt(this.editLaborObj.districtId);
    laborDto.laborName = this.editLaborObj.laborName;
    laborDto.taskDetail = this.editLaborObj.taskDetail;
    laborDto.workHours = parseInt(this.editLaborObj.workHours);

      this.laborService.updateLabor(id, laborDto).subscribe(
        res =>{
          this.snackBar.open("Labor Updated Successfully",'Dismiss',{
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass:['success-snackBar'],
   
          });

          this.ngOnInit();
        },
        err =>{
          this.snackBar.open("Something went wrong Could not update Labor",'Dismiss',{
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass:['red-snackBar'],
   
          });

          this.ngOnInit();
        }
      );

  }

  deleteLabor(id:number){
    this.laborService.deleteLabor(id).subscribe(
      res =>{
        this.snackBar.open("Labor Deleted Successfully",'Dismiss',{
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
    )
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
    // alert(event.target.value);
    this.getDistrictByCountryId(event.target.value);
  }

  getDistrictByCountryId(id:number){

    this.districtService.getDistrictByCountryId(id).subscribe(
      res =>{
        this.districtObjs = res;
      },
      err =>{
        console.log(err.error);
      }
    );

  }

  changeDistrictHandler(event:any){
    this.addLaborObj.districtId =parseInt( event.target.value);
  }

  search(){
    if(this.searchResult == ""){
      this.ngOnInit();
    }else{
      this.laborObjs=this.laborObjs.filter(res =>{
        //console.log(res);

        if(res.laborName.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
        return res.laborName.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
        }
        if(res.district.name.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.district.name.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
        if(res.taskDetail.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.taskDetail.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
      });
    }
  }

}
