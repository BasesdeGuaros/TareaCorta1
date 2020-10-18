import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Observable } from 'rxjs';
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

/**
* Servicio que ofrece el protocolo https para User
* Permite obtener, editar, anadir y eliminar un usuario
* */

export class ApiuserService {

  url: string = "https://localhost:44372/api/user";

  constructor(
    private _http: HttpClient) { }

  getUser(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

  getProducer(rol: string): Observable<Reply> {
    return this._http.get<Reply>(this.url+rol);
  }

  add(user: User): Observable<Reply> {
    return this._http.post<Reply>(this.url, user, httpOption)
  }

  edit(user: User): Observable<Reply> {
    return this._http.put<Reply>(this.url, user, httpOption)
  }

  delete(userName: string): Observable<Reply> {
    return this._http.delete<Reply>(`${this.url}/${userName}`)
  }
}

