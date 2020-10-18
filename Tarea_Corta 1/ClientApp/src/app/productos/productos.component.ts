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
  public userName;
  currentCategoryUpdate;

  products = [
    {
      'name': 'Tomate', category: 'Verdura', photo: 'photo1', price: 100, mode: 'kilo', cuantity: 200
    },

  ];


  model: any = {};
  modelN: any = {};
  model2: any = {}

  constructor(
    private apiProductsProducer: ApiproductsproducerService,
    private apiProducers: ApiproducerService, //creo que no se ocupa
    private apiProducts: ApiproductsService,
    private route: ActivatedRoute
  ) {
  }

  /**
* Funcion que se ejecuta al inicio
* */
  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName');

    this.getProducts();
    this.getPP();
  }

  getProducts() {
    this.apiProducts.getProducts().subscribe(reply => {
      console.log(reply);
      this.listProducts = reply.data;
    });
  }


  getPP() {
    this.apiProductsProducer.getPP().subscribe(reply => {
      console.log(reply);
      this.listProductsProducer = reply.data;
    });
  }


  addProduct() {
    if (this.model.name == 'Otro') {
      $('#addNewProductModal').modal('show');
    } else {
      let idUser = this.route.snapshot.paramMap.get('idUser'); //agarrar el producerId del link
      
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
        idProducer: parseInt(idUser), //hay que pasarle el id de productor, que es diferente al id del usuario
        price: parseInt(this.model.price),
      }

      this.apiProductsProducer.add(productsP).subscribe(Reply => {
        console.log(Reply.conexionSuccess);
        console.log(Reply.message);
      });
    }
  }




  addNewProduct() {
    var idCategory;
    var i;
    for (i = 0; this.listProducts.length; i++) {
      if (this.listProducts[i].category.name == this.modelN.category) {
        idCategory = this.listProducts[i].categoryId;
      }
    }

    const category: category = {
      name: this.modelN.category
    }

    const products: products = {
      sale_mode: this.modelN.sale,
      category_id: idCategory,
      product: this.modelN.name
    }



    let idUser = this.route.snapshot.paramMap.get('idUser'); //agarrar el producerId del link
    var idCategory;
    var idProduct;
    var idProducer;
    var i;
    for (i = 0; this.listProductsProducer.length; i++) {
      if (this.listProductsProducer[i].idProducerNavigation.id == idUser) {
        idProduct = this.listProductsProducer[i].idProduct;
        idProducer = this.listProductsProducer[i].idProducer;
        idCategory = this.listProductsProducer[i];
      }
    }
    const productsP: productsproducer = {
      quantity: parseInt(this.model.quantity),
      idProduct: idProduct,
      idProducer: idProducer,
      price: parseInt(this.model.price)
    }
  }



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
