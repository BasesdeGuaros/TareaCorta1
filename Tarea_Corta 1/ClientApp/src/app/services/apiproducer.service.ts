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
export class ApiproducerService {

  url: string = "https://localhost:44372/api/producers";


  constructor(
    private _http: HttpClient) { }

  getProducer(): Observable<Reply> {
    return this._http.get<Reply>(this.url);
  }
}
