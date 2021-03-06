import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { DistrictComponent } from './district/district.component';
import { HomeComponent } from './home/home.component';
import { LaborComponent } from './labor/labor.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: "country", component:CountryComponent},
  {path: "labor", component:LaborComponent},
  {path: "district", component:DistrictComponent},
  {path: "report", component:ReportComponent},
  {path: "home", component:HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
