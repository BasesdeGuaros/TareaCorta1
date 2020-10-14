
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productor',
  templateUrl: './productor.component.html',
  styleUrls: ['./productor.component.scss']
})
export class ProductorComponent {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }




  productors = [
    {
      'name': 'Daniel', id: '117460001', lastName: 'Garcia Fallas', location: 'Desamparados', birthD: '11/06/1999'
      , phone: '61834960', sinpe: '61834960', places: 'desamparados', afil: 1, user: 'garza', password: 'hola123'
    },
    {
      'name': 'quiero ser afiliado', id: '11111111', lastName: 'lastname', location: 'none', birthD: 'none'
      , phone: '101010', sinpe: '10101010', places: 'none', afil: 0, user: 'user', password: 'hola123'
    },

  ];



  pedidos = [


    {
      id: 2312, lista: [{ 'name': 'Tomate', id: 'Verdura', cuantity: 5, price: 100 }, { 'name': 'Lechuga', id: 'Verdura', cuantity: 6, price: 50 }], dir: "algun lugar"
    }, {
      id: 4356, lista: [{ 'name': 'Manzana', id: 'Fruta', cuantity: 3, price: 400 }], dir: "algun lugar"
    }
      
    
    
  ];

  

  model: any = {};


  activateModal(): void {
    $('#addModal').modal('show');
  }


  addProductor(): void {
    this.model.afil = 0;
    this.productors.push(this.model);
    this.model = {};

  }


}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
