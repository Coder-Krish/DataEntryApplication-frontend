import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from 'src/app/_models/district.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http:HttpClient) { }

  getAllDistrict():Observable<any>{
      return this.http.get(environment.apiUrl + 'District', {responseType:'json'});
  }
  addDistrict(district:District){
    return this.http.post(environment.apiUrl + 'District', district, {responseType:'json'});
  }

  getDistrictById(id:number):Observable<any>{
    return this.http.get(environment.apiUrl + 'District/'+id, {responseType:'json'});
  }

  updateDistrict(id:number, districtData:District):Observable<any>{
    return this.http.put(environment.apiUrl + 'District/'+id, districtData,{responseType:'json'});
  }
  deleteDistrict(id:number):Observable<any>{
    return this.http.delete(environment.apiUrl + 'District/'+id, {responseType:'json'});
  }
}
