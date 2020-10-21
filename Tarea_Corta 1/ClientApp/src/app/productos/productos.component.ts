import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiproductsproducerService } from '../services/apiproductsproducer.service';
import { productsproducer } from '../Models/productsProducer'
import { category } from '../Models/category'
import { products } from '../Models/products'
import { ActivatedRoute } from '@angular/router';
import { ApiproducerService } from '../services/apiproducer.service';
import { ApiproductsService } from '../services/apiproducts.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit{
  public listProductsProducer = [];
  public listProducers = [];
  public listProducts = [];
  public listMyProductsP = [];
  public userName;
  public idUser;
  public idProducer;

  model: any = {};
  modelN: any = {};
  model2: any = {}


  constructor(
    private apiProductsProducer: ApiproductsproducerService,
    private apiProducers: ApiproducerService,
    private apiProducts: ApiproductsService,
    private route: ActivatedRoute
  ) {
  }

  /**
* Funcion que se ejecuta al inicio
* */
  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName');
    this.idUser = this.route.snapshot.paramMap.get('idUser'); //agarrar el producerId del link

    this.getProducers();
    this.getProducts();
    this.getPP();
  }


  getProducers() {
    this.apiProducers.getProducer().subscribe(reply => {
      console.log(reply);
      this.listProducers = reply.data;

      var i;
      for (i = 0; i <= this.listProducers.length - 1; i++) {
        if (this.listProducers[i].id == this.idUser) {
          this.idProducer = this.listProducers[i].idProducer;
        }
      }
    });
  }

  getPP() {
    this.apiProductsProducer.getPP().subscribe(reply => {
      console.log(reply);
      this.listProductsProducer = reply.data;

      var i;
      for (i = 0; i <= this.listProductsProducer.length - 1; i++) {
        if (this.listProductsProducer[i].idProducerNavigation.id == this.idUser) {
          this.listMyProductsP.push(this.listProductsProducer[i]);
        }
      }
    });
  }

  getProducts() {
    this.apiProducts.getProducts().subscribe(reply => {
      console.log(reply);
      this.listProducts = reply.data;
    });
  }

  addProduct() {
    if (this.model.name == 'Otro') {
      $('#addNewProductModal').modal('show');
    } else {
      
      var idProduct;
      var i;
      for (i = 0; i <= this.listProducts.length - 1; i++) {
        console.log(this.listProducts[i]);
        if (this.listProducts[i].product == this.model.name) {
          idProduct = this.listProducts[i].id;
        }
      }

      const productsP: productsproducer = {
        quantity: parseInt(this.model.quantity),
        idProduct: idProduct,
        idProducer: parseInt(this.idProducer),
        price: parseInt(this.model.price),
        id: 0
      }

      this.apiProductsProducer.add(productsP).subscribe(Reply => {
        console.log(Reply.conexionSuccess);
        console.log(Reply.message);
      });
    }
  }

  addNewProduct() { 
    const product: products = {
      SaleMode: this.modelN.sale,
      CategoryId: 1, //hay que cambiarlo
      product: this.modelN.name
    }

    this.apiProducts.add(product).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      console.log(Reply.message);
    });

    var idProduct = this.listProducts[this.listProducts.length - 1].id + 1;
    
    const productsP: productsproducer = {
      quantity: parseInt(this.model.quantity),
      idProduct: idProduct,
      idProducer: parseInt(this.idProducer),
      price: parseInt(this.model.price),
      id: 0
    }

    console.log(productsP);
    this.apiProductsProducer.add(productsP).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      console.log(Reply.message);
    });
  }

  activateModal(): void {
    $('#addCategoryModal').modal('show');
  }


  deleteCategory(i): void {
    var asnwer = confirm("are you sure you want to delete this category? ");
    if (asnwer) {
      this.apiProductsProducer.delete(this.listMyProductsP[i].id).subscribe(Reply => {
        console.log(Reply.conexionSuccess);
        console.log(Reply.message);
      });
    }
  }

  editCategory(i): void {
    this.model2.name = this.listMyProductsP[i].idProductNavigation.product;
    this.model2.category = this.listMyProductsP[i].idProductNavigation.category.name;
    this.model2.price = this.listMyProductsP[i].price;
    this.model2.mode = this.listMyProductsP[i].idProductNavigation.saleMode;
    this.model2.quantity = this.listMyProductsP[i].quantity;
    console.log(this.listMyProductsP)
  }

  editProductsP() {
    var id;
    var i;
    for (i = 0; i <= this.listMyProductsP.length - 1; i++) {
      if (this.model2.name == this.listMyProductsP[i].idProductNavigation.product) {
        id = this.listMyProductsP[i].id;
      }
    }

    var idProduct;
    var i;
    for (i = 0; i <= this.listProducts.length - 1; i++) {
      if (this.listProducts[i].product == this.model2.name) {
        idProduct = this.listProducts[i].id;
      }
    }

    const productsP: productsproducer = {
      quantity: parseInt(this.model2.quantity),
      idProduct: idProduct,
      idProducer: parseInt(this.idProducer),
      price: parseInt(this.model2.price),
      id: id
    }
      
    this.apiProductsProducer.edit(productsP).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      console.log(Reply.message);
    });
  }

}
