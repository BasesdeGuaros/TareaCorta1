import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent{


  constructor() {
  }

  
  currentCategoryUpdate;



  categories = [
      {
        'name': 'Verdura', id: '1'
      },

    ];
  

  model: any = {};

  activateModal(): void {
    $('#addCategoryModal').modal('show');
  }

  addCategory(): void {
    this.categories.push(this.model);
    this.model = {};

  }

  deleteCategory(i): void {

    var asnwer = confirm("are you sure you want to delete this category? ");
    if (asnwer) {
      this.categories.splice(i, 1);

    }

  }

  editCategory(i): void {

    
    this.model.name = this.categories[i].name;
    this.model.id = this.categories[i].id;


    this.currentCategoryUpdate = i;
  }

  updateCategory(): void {

    var asnwer = confirm("are you sure you want to update this category? ");

    if (asnwer) {

      
      this.categories[this.currentCategoryUpdate] = this.model;
      this.model = {};

    }

  }
}


interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
