import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'
import { orderproducts } from '../Models/orderproducts'

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiorderproductsService {

  url: string = "https://localhost:44372/api/orderproducts";

  constructor(private _http: HttpClient) { }

  getOrderP(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

  add(orderproducts: orderproducts): Observable<Reply> {
    return this._http.post<Reply>(this.url, orderproducts, httpOption)
  }

  edit(orderproducts: orderproducts): Observable<Reply> {
    return this._http.put<Reply>(this.url, orderproducts, httpOption)
  }
}
