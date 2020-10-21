import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsProducer } from '../Models/productsProducer'
import { Reply } from '../Models/reply'

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})

/**
* Servicio que ofrece el protocolo https para ProductsProducer
* Permite obtener, editar y anadir datos de los productores
* */



export class ApiproductsproducerService {

  url: string = "https://localhost:44372/api/productsproducer";

  constructor(
    private _http: HttpClient) { }

  getPP(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

  add(PP: ProductsProducer): Observable<Reply> {
    return this._http.post<Reply>(this.url, PP, httpOption)
  }
  edit(PP: ProductsProducer): Observable<Reply> {
    return this._http.put<Reply>(this.url, PP, httpOption)
  }
  delete(userName: string): Observable<Reply> {
    return this._http.delete<Reply>(`${this.url}/${userName}`)
  }
}
