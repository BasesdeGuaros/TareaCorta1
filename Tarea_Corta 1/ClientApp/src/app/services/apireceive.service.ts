import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply } from '../Models/reply'

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'appliacation/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApireceiveService {

  url: string = "https://localhost:44372/api/receive";


  constructor(
    private _http: HttpClient) { }

  getReceive(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }

  /*add(Receive: receive): Observable<Reply> {
    return this._http.post<Reply>(this.url, receive, httpOption)
  }*/
}
