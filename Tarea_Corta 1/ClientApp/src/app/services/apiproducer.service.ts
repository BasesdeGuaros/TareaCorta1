import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'
import { Producer } from '../Models/producer';


const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiproducerService {

  url: string = "https://localhost:44372/api/producers";


  constructor(
    private _http: HttpClient) { }

  getProducer(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

  add(user: Producer): Observable<Reply> {
    return this._http.post<Reply>(this.url, user, httpOption)
  }

  edit(producer: Producer): Observable<Reply> {
    return this._http.put<Reply>(this.url, producer, httpOption)
  }

  delete(userName: string): Observable<Reply> {
    return this._http.delete<Reply>(`${this.url}/${userName}`)
  }

}
