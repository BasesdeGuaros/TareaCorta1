import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html'

})
export class ReportesComponent {

  constructor() {
   
  }





  value: number = 2;

  productsSold = [
    {
      'name': 'tomate', id: 1, num: 57, price: 100
    },
    {
      'name': 'lechuga', id: 2, num: 43, price: 50
    },
    {
      'name': 'manzana', id: 3, num: 12,price: 400
    },
  ]

  customers = [
    {
      'name': 'Daniel', id: 1, bought: 5
    },
    {
      'name': 'Sing', id: 2, bought: 10
    },
    {
      'name': 'Elias', id: 3, bought: 53
    },
  ]

  showItem1(): void {
    var x = document.getElementById("more1");
    var x2 = document.getElementById("more2");
    var x3 = document.getElementById("more3");
    var x4 = document.getElementById("more4");

   

      if (x.style.display === "none") {
        x.style.display = "block";
        x2.style.display = "none";
        x3.style.display = "none";
        x4.style.display = "none";
      } else {
        x.style.display = "none";
        x2.style.display = "none";
        x3.style.display = "none";
        x4.style.display = "none";
        
      }

  }

  showItem2(): void {
    var x = document.getElementById("more1");
    var x2 = document.getElementById("more2");
    var x3 = document.getElementById("more3");
    var x4 = document.getElementById("more4");

    

    



    if (x2.style.display === "none") {
      x2.style.display = "block";
      x.style.display = "none";
      x3.style.display = "none";
      x4.style.display = "none";
    } else {
      x2.style.display = "none";
      x.style.display = "none";
      x3.style.display = "none";
      x4.style.display = "none";

    }

  }

  showItem3(): void {
    var x = document.getElementById("more1");
    var x2 = document.getElementById("more2");
    var x3 = document.getElementById("more3");
    var x4 = document.getElementById("more4");



    if (x3.style.display === "none") {
      x3.style.display = "block";
      x2.style.display = "none";
      x.style.display = "none";
      x4.style.display = "none";
    } else {
      x3.style.display = "none";
      x2.style.display = "none";
      x.style.display = "none";
      x4.style.display = "none";

    }

  }

  showItem4(): void {
    var x = document.getElementById("more1");
    var x2 = document.getElementById("more2");
    var x3 = document.getElementById("more3");
    var x4 = document.getElementById("more4");



    if (x4.style.display === "none") {
      x4.style.display = "block";
      x2.style.display = "none";
      x3.style.display = "none";
      x.style.display = "none";
    } else {
      x4.style.display = "none";
      x2.style.display = "none";
      x3.style.display = "none";
      x.style.display = "none";

    }

  }

}
