import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'
import { stock } from '../Models/stock'

//ng generate service services/apicustomer
//obtener propiedades de http

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApistockService {
  url: string = "https://localhost:44372/api/stock";


  constructor(
    private _http: HttpClient) { }

  //Observable se usa para hacer solicitudes a servicios
  getStock(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

  /*add(customer: customer): Observable<Reply> {
    return this._http.post<Reply>(this.url, customer, httpOption)
  }

  edit(customer: customer): Observable<Reply> {
    return this._http.put<Reply>(this.url, customer, httpOption)
  }

  delete(userName: string): Observable<Reply> {
    return this._http.delete<Reply>(`${this.url}/${userName}`)
  }*/
}
