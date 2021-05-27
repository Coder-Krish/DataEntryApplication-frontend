import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from '../_models/country.model';
import { CountryService } from '../_services/country-service/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  public countryObjs:Array<Country> = new Array<Country>();
  public addCountryObj:Country = new Country();
  public viewCountryObj:Country = new Country();
  public editCountryObj:Country = new Country();

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="You can not undo this operation after you confirm to delete.";
  cancelClicked=false;

  totalRecords : number;
  page: number = 1;

  searchResult:any;



  constructor(private countryService:CountryService,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.countryService.getAllCountries().subscribe(
          res =>{
            
            this.countryObjs = res;
          },
          err =>{
            console.log(err.error);
          }
        );
  }

  addCountry(){

      this.countryService.addCountry(this.addCountryObj).subscribe(
          (res:any) =>{
           // this.addCountryObj = res;

            this.snackBar.open("Country Added Successfully",'Dismiss',{
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass:['success-snackBar'],
     
            });
            this.ngOnInit();
           
          },
          err =>{
            this.snackBar.open("Something went wrong,Country could not be added",'Dismiss',{
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass:['red-snackBar'],
     
            });
            this.ngOnInit();
          }
        );
      
  }

  getCountryById(id:number){
    this.countryService.getCountryById(id).subscribe(
      res =>{
       
        this.viewCountryObj = res;
      },
      err =>{
        console.log(err.error);
      }
    
    );
    
  }
  updateCountryClicked(id:number){
    this.countryService.getCountryById(id).subscribe(
      res =>{
        this.editCountryObj = res;
      },
      err =>{
    console.log(err);
      }
    );
  }

  updateCountry(id:number){
      this.countryService.updateCountry(id, this.editCountryObj).subscribe(
        res =>{
         
          this.snackBar.open("Country Updated Successfully",'Dismiss',{
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass:['success-snackBar'],
   
          });
          this.ngOnInit();
        },
        err =>{
          this.snackBar.open("something went wrong could not update Country",'Dismiss',{
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass:['red-snackBar'],
   
          });
          this.ngOnInit();
        }
      );
  }

  deleteCountry(id:number){
    this.countryService.deleteCountry(id).subscribe(
      res =>{
        this.countryObjs = res;
        this.snackBar.open("Country Deleted Successfully",'Dismiss',{
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

  search(){
    if(this.searchResult == ""){
      this.ngOnInit();
    }else{
      this.countryObjs=this.countryObjs.filter(res =>{
        //console.log(res);

        if(res.code.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
        return res.code.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
        }
        if(res.name.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
          return res.name.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())
        }
      });
    }
  }

}
