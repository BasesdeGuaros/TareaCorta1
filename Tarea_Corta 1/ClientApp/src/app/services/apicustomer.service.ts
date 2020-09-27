import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'

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
export class ApicustomerService {

  url: string = "https://localhost:44372/api/customer";

  constructor(
    //atributo para hacer solicitudes
    private _http: HttpClient) { }

  //se ejecuta despues del constructor y dentro del ciclo de vida de angular

  //Observable se usa para hacer solicitudes a servicios
  getCustomer(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

 /* add(client: Client): Observable<Response> {
    return this._http.post<Response>(this.url, client, httpOption)
  }*/
}

