import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent{
  public forecasts: WeatherForecast[];


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  
  currentCategoryUpdate;



  products = [
      {
        'name': 'Tomate', category: 'Verdura', photo: 'photo1', price: 100, mode: 'kilo', cuantity: 200
      },

    ];
  

  model: any = {};
  model2: any = {};

  activateModal(): void {
    $('#addCategoryModal').modal('show');
  }

  addCategory(): void {
    this.products.push(this.model);
    this.model = {};

  }

  deleteCategory(i): void {

    var asnwer = confirm("are you sure you want to delete this category? ");
    if (asnwer) {
      this.products.splice(i, 1);

    }

  }

  editCategory(i): void {

    
    this.model2.name = this.products[i].name;
    this.model2.category = this.products[i].category;
    this.model2.photo = this.products[i].photo;
    this.model2.price = this.products[i].price;
    this.model2.mode = this.products[i].mode;
    this.model2.cuantity = this.products[i].cuantity;


    this.currentCategoryUpdate = i;
  }

  updateCategory(): void {

    var asnwer = confirm("are you sure you want to update this category? ");

    if (asnwer) {


      this.products[this.currentCategoryUpdate] = this.model2;
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
