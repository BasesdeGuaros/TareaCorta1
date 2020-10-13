import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderProducts } from '../Models/orderproducts'
import { Reply } from '../Models/reply'

//ng generate service services/apiuser
const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};



@Injectable({
  providedIn: 'root'
})
export class ApiproductsproducerService {

  url: string = "https://localhost:44372/api/productsproducer";

  constructor(
    private _http: HttpClient) { }

  getPP(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

  add(PP: OrderProducts): Observable<Reply> {
    return this._http.post<Reply>(this.url, PP, httpOption)
  }
}
