
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
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

  ngOninit(): void{

  var i;
  for (i = 0; i < this.productors.length; i++) {
    if (this.productors[i].afil = 1) {
      this.afilNumber++;
    }
  }
  }





  model: any = {};
  model2: any = {};
  model4: any = {};

  currentProductorUpdate;
  currentCategoryUpdate;
  currentAfiliation;
  afilNumber: number = 0;


  activateModal(): void {
    $('#addModal').modal('show');
  }

  activateModal3(i): void {
    this.loadAfiliation(i);
    $('#aceptAfilModal').modal('show');


  }

  loadAfiliation(i): void {

    this.model4.name = this.productors[i].name;
    this.model4.lastName = this.productors[i].lastName;
    this.model4.id = this.productors[i].id;
    this.model4.location = this.productors[i].location;
    this.model4.birthD = this.productors[i].birthD;
    this.model4.phone = this.productors[i].phone;
    this.model4.sinpe = this.productors[i].sinpe;
    this.model4.places = this.productors[i].places;
    this.model4.user = this.productors[i].user;
    this.model4.password = this.productors[i].password;

    this.currentAfiliation = i;
  }

  addAfiliation(): void {
    var asnwer = confirm("Are you sure you want to add this productor? ");

    if (asnwer) {


      this.productors[this.currentAfiliation] = this.model4;
      this.model4.afil = 1;
      this.model4 = {};

    }

  }

  deleteAfiliation(ident): void {
    var i;
    for (i = 0; i < this.productors.length; i++) {
      if (this.productors[i].id == ident) {
        this.productors.splice(i,1);
      }

    }
  }

  plusAfilNumber(): void {
    this.afilNumber++;
  }

  resetAfiliationNumber(): void {

    this.afilNumber = 0;
  }



  addProductor(): void {
    this.model.afil = 1;
    this.productors.push(this.model);
    this.model = {};

  }

  deleteProductor(i): void {

    var asnwer = confirm("are you sure you want to delete this productor? ");
    if (asnwer) {
      this.productors.splice(i, 1);
      
    }

  }

  editProductor(i): void {

   
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

    var asnwer = confirm("are you sure you want to update this productor? ");

    if (asnwer) {

      this.model2.afil = 1;
      this.productors[this.currentProductorUpdate] = this.model2;
      this.model2 = {};

    }

  }

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
