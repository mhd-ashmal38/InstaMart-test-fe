import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API="http://localhost:3000"

  constructor(private http:HttpClient) { }

  // Get all products
  getProducts=()=>{
    return this.http.get(`${this.API}/products`)
  }

  // login
  userLogin=()=>{
    return this.http.get(`${this.API}/users`)
  }
}
