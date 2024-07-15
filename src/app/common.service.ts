import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  readonly url = "http://localhost:3000/";

  constructor(private http:HttpClient) { }

  addUpdateUser(data : any, type : any ):Observable<any>{

    if(type=='add'){
    return this.http.post(this.url+"Users",data);
    }else{
    return this.http.put(this.url+"Users/"+data.id,data);
    }
  }

  getData():Observable<any>{
    return this.http.get(this.url+"Users")
  }

  delete(id: string):Observable<any>{
    return this.http.delete(this.url+"Users/"+id)
  }

  getByID(id: string):Observable<any>{
    return this.http.get(this.url+"Users/"+id)
  }
}
