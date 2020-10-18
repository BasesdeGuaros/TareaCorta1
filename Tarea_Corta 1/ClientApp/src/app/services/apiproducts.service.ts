import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { products } from '../Models/products';
import { Reply } from '../Models/reply'


const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiproductsService {


  url: string = "https://localhost:44372/api/products";

  constructor(
    private _http: HttpClient) { }

  getProducts(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

  add(products: products): Observable<Reply> {
    return this._http.post<Reply>(this.url, products, httpOption)
  }

  edit(products: products): Observable<Reply> {
    return this._http.put<Reply>(this.url, products, httpOption)
  }

}
