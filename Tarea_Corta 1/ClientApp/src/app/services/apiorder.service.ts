import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'
import { order } from '../Models/Order'

//ng generate service services/apiuser
/**
 * Servicio que ofrece el protocolo https para Order
 * Permite obtener, editar y anadir una order
 * */

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiorderService {

  url: string = "https://localhost:44372/api/order";

  constructor(
    private _http: HttpClient) { }

  getOrder(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

  add(order: order): Observable<Reply> {
    return this._http.post<Reply>(this.url, order, httpOption)
  }

  edit(order: order): Observable<Reply> {
    return this._http.put<Reply>(this.url, order, httpOption)
  }
}
