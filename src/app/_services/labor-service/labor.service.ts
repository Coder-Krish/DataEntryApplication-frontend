import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Labor } from 'src/app/_models/labor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaborService {

  constructor(private http:HttpClient) { }

  getAllLabors():Observable<any>{
      return this.http.get(environment.apiUrl + 'Labor', {responseType:'json'});
  }
  addLabor(labor:Labor){
    return this.http.post(environment.apiUrl + 'Labor', labor, {responseType:'json'});
  }

  getLaborById(id:number):Observable<any>{
    return this.http.get(environment.apiUrl + 'Labor/'+id, {responseType:'json'});
  }

  updateLabor(id:number, laborData:Labor):Observable<any>{
    return this.http.put(environment.apiUrl + 'Labor/'+id, laborData,{responseType:'json'});
  }
  deleteLabor(id:number):Observable<any>{
    return this.http.delete(environment.apiUrl + 'Labor/'+id, {responseType:'json'});
  }

  countLabor():Observable<any>{
    return this.http.get(environment.apiUrl + 'countLabors');
  }
}
