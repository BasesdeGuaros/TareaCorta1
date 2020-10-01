
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }



  productors = [
    {
      'name': 'Daniel', id: '117460001', lastName: 'Garcia Fallas', location: 'Desamparados', birthD: '11/06/1999'
      , phone: '61834960', sinpe: '61834960', places: 'desamparados', user: 'garza', password: 'hola123'},
    
  ];


  model: any = {};
  model2: any = {};
  hideUpdate: boolean = true;
  currentProductorUpdate;
  afilNumber: number = 0;

 

  addProductor(): void {
    this.productors.push(this.model);
    
    
  }

  deleteProductor(i): void {

    var asnwer = confirm("are you sure you want to delete this productor? ");
    if (asnwer) {
      this.productors.splice(i, 1);
      
    }

    
    
  }


  editProductor(i): void {

    this.hideUpdate = false;
    this.model2.name = this.productors[i].name;
    this.model2.lastName = this.productors[i].lastName;
    this.model2.id = this.productors[i].id;
    this.model2.location = this.productors[i].location;
    this.model2.birthD = this.productors[i].birthD;
    this.model2.phone = this.productors[i].phone;
    this.model2.sinpe = this.productors[i].sinpe;
    this.model2.places = this.productors[i].places;
    this.model2.user = this.productors[i].user;
    this.model2.password = this.productors[i].password;
    
    this.currentProductorUpdate = i;
  }

  updateProductor(): void {

    var asnwer = confirm("are you sure you want to delete this productor? ");

    if (asnwer) {

      this.hideUpdate = true;
      this.productors[this.currentProductorUpdate] = this.model2;
      this.model2 = {};

    }

  }

  function1(): void {
    this.afilNumber++;
  }


}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
