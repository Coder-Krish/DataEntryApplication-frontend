import { Component, OnInit } from '@angular/core';
import { District } from '../_models/district.model';
import { DistrictService } from '../_services/district-service/district.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {


  public districtObjs: Array<District> = new Array<District>();
  public totalExpenditure: number = 0;
  public laborRatePerHour: number = 0;
  public workHours: number = 0;
  public totalLabors: number = 0;


 
  constructor(private districtService: DistrictService) { }

  ngOnInit(): void {

    this.districtService.getAllDistrict().subscribe(
      res => {
        this.districtObjs = res;
        for (let i = 0; i < this.districtObjs.length; i++) {
          this.laborRatePerHour = parseInt(this.districtObjs[i].laborRatePerHour);
          for (let j = 0; j < this.districtObjs[i].labor.length; j++) {
           
            if(this.districtObjs[i].labor[j].isActive == true){
            this.totalLabors = this.totalLabors + 1;
            this.workHours = parseInt(this.districtObjs[i].labor[j].workHours);
             this.totalExpenditure = this.totalExpenditure + (this.workHours * this.laborRatePerHour);
              this.districtObjs[i].totalExpenditure= this.totalExpenditure;
             
            }
            this.districtObjs[i].totalLabors = this.totalLabors;
     
          }
          this.totalExpenditure = 0;
          this.totalLabors = 0;
        
        }
        console.log(this.districtObjs);
      
      },
      err => {
        console.log(err.error);
      }

    );

  }

}
