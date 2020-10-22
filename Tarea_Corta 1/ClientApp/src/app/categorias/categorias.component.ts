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


  //lista de categorias disponibles para los productores
  categories = [
      {
        'name': 'Verdura', id: '1'
      },

    ];
  

  model: any = {};

  activateModal(): void {
    $('#addCategoryModal').modal('show');
  }

  /**
   *Añade un elemento de categoría a la base de datos
   * */
  addCategory(): void {
    this.categories.push(this.model);
    this.model = {};

  }

  /**
   * Elimina un elemento de la tabla de categoría
   * @param i
   */
  deleteCategory(i): void {
    var asnwer = confirm("are you sure you want to delete this category? ");
    if (asnwer) {
      this.categories.splice(i, 1);
    }
  }

  /**
   * Busca un índice de la tabla para cargar la información al modal
   * @param i
   */
  editCategory(i): void {
    this.model.name = this.categories[i].name;
    this.model.id = this.categories[i].id;
    this.currentCategoryUpdate = i;
  }

  /**
   *Actualiza la información en la tabla de categoría
   * */
  updateCategory(): void {
    var asnwer = confirm("are you sure you want to update this category? ");
    if (asnwer) {
      this.categories[this.currentCategoryUpdate] = this.model;
      this.model = {};
    }
  }
}
