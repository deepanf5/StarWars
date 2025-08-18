import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Swapi {

  APIUrl = "https://swapi.info/api/people"

  constructor(private http:HttpClient) {}



  getSwapi() {
    return this.http.get(this.APIUrl)
  }
  
}
