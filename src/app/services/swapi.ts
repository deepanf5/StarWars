import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { People } from '../components/models/people';

@Injectable({
  providedIn: 'root'
})
export class Swapi {

  APIUrl:string = "https://swapi.info/api/people";
  id!:number

  constructor(private http:HttpClient) {}



  getSwapi() {
    return this.http.get<People[]>(this.APIUrl)
  }

  getId(id:number) {
    this.id = id
  }

  getDetails() {
    let url = this.APIUrl+'/' + this.id
    return this.http.get(url)
  }


  getSwapI(url:string) {

    return this.http.get(url)
  }

 

 


  


  
}
