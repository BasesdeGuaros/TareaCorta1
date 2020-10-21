import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiorderService } from '../services/apiorder.service';
import { ApiorderproductsService } from '../services/apiorderproducts.service';
import { ApiuserService } from '../services/apiuser.service';
import { order } from '../Models/order'
import { productsproducer } from '../Models/productsProducer'
import { orderproducts } from '../Models/orderproducts'
import { ApiproductsproducerService } from '../services/apiproductsproducer.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
/** checkout component*/
export class CheckoutComponent implements OnInit{
  public listOrder = [];
  public listOrderP = [];
  public listUser = [];
  public listMyOrders = [];
  public listProductP = [];
  public userName;
  public idCustomer;
  public total = 0;
  public size = 0;
  public priceAux = 0;

    /** checkout ctor */
  constructor(
    private apiOrderP: ApiorderproductsService,
    private apiOrder: ApiorderService,
    private route: ActivatedRoute,
    private apiUser: ApiuserService,
    private apiProductsP: ApiproductsproducerService
    ) {
  }


/**
* Funcion que se ejecuta al inicio
* */
  ngOnInit(): void {
    this.getUser();
    this.getOrder();
    this.getOrderp();
    this.getProductsP();
  }

  /**
   * Solicitud para editar una orden general
   * */
  editOrder() {
    var idP;
    var subtotal;
    var j;

    for (j = 0; j <= this.listOrder.length - 1; j++) {
      if (this.listOrder[j].idCustomer == this.idCustomer) {
        idP = this.listOrder[j].id;
        subtotal = this.listOrder[j].subtotal; 
      }
    }
    const order: order = {
      id: idP,
      idCustomer: this.idCustomer,
      subtotal: subtotal,
      tax: 15.0,
      total: this.total,
      isActive: 0 
    };

    /*
    const pp: productsproducer = {
      quantity: number,
      idProduct: number,
      idProducer: number,
      price: 0
    };*/

    this.apiOrder.edit(order).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      console.log(Reply.message);

      if (Reply.conexionSuccess == 1) {
        $('#buyModal').modal('show');
      }
    });


    /*
    this.apiProductsP.edit(pp).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      console.log(Reply.message);
    });*/
  }

/**
* Solicitud para editar una orden de productos
* */
  editOrderp(orderp) {
    this.apiOrderP.edit(orderp).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      console.log(Reply.message);
    });
  }

  /**
   * Calcula el total
   * */
  calcTotal() {
    let user = this.route.snapshot.paramMap.get('userName')
    var i;
    for (i = 0; i <= this.listUser.length - 1; i++) {
      if (this.listUser[i].username == user) {
        this.idCustomer = this.listUser[i].idUser;
      }
    }
    var i;
    for (i = 0; i <= this.listOrder.length - 1; i++) {
      if (this.listOrder[i].idCustomer == this.idCustomer && this.listOrder[i].isActive == 1) {
        this.listOrder[i].total += (this.listOrder[i].tax / 100 * this.listOrder[i].subtotal) + this.listOrder[i].subtotal;
        this.total = this.listOrder[i].total;
        console.log(this.total)
      }
    }
  }

  /**
   * Permite editar el cantidad de productos a comprar
   * @param i
   */
  public add(i) {
    this.priceAux = this.listMyOrders[i].total / (this.listMyOrders[i].quantity);
    this.listMyOrders[i].quantity = this.listMyOrders[i].quantity + 1;
    this.listMyOrders[i].total += this.priceAux;   

    this.total += this.listMyOrders[i].total / (this.listMyOrders[i].quantity);

    const orderp: orderproducts = {
      id: this.listMyOrders[i].id,
      idorder: this.listMyOrders[i].idOrder,
      quantity: this.listMyOrders[i].quantity,
      idproduct: this.listMyOrders[i].idProduct,
      total: this.total
    }

    this.editOrderp(orderp);
  }

/**
 * Permite editar el cantidad de productos a comprar
 * @param i
 */
  public less(i) {
    if (this.listMyOrders[i].quantity > 0) {
      this.listMyOrders[i].quantity = this.listMyOrders[i].quantity - 1;
      this.listMyOrders[i].total -= this.listMyOrders[i].total / (this.listMyOrders[i].quantity + 1);

      this.total -= this.listMyOrders[i].total / (this.listMyOrders[i].quantity);

      const orderp: orderproducts = {
        id: this.listMyOrders[i].id,
        idorder: this.listMyOrders[i].idOrder,
        quantity: this.listMyOrders[i].quantity,
        idproduct: this.listMyOrders[i].idProduct,
        total: this.total
      }

      this.editOrderp(orderp);
    } else {
      
      this.priceAux = this.listMyOrders[i].total / (this.listMyOrders[i].quantity);
      this.listMyOrders[i].quantity = 0;
      this.listMyOrders[i].total = 0;
    }
  }

/**
* Solicitud a la base de datos para obtener los Usuarios
* */
  getUser() {
    this.apiUser.getUser().subscribe(reply => {
      console.log(reply);
      this.listUser = reply.data;

      
      let user = this.route.snapshot.paramMap.get('userName')
      var i;
      for (i = 0; i <= this.listUser.length - 1; i++) {
        if (this.listUser[i].username == user) {
          this.idCustomer = this.listUser[i].idUser;
        }
      }

      this.apiOrder.getOrder().subscribe(reply => {
        console.log(reply);
        this.listOrder = reply.data;
        console.log(this.listOrder.length);

        var i;
        for (i = 0; i <= this.listOrder.length - 1; i++) {


          if (this.listOrder[i].idCustomer == this.idCustomer && this.listOrder[i].isActive == 1) {
            this.listOrder[i].total += (this.listOrder[i].tax / 100 * this.listOrder[i].subtotal) + this.listOrder[i].subtotal;
            this.total = this.listOrder[i].total;
            console.log(this.total)
          }
        }
      });
    });
  }

/**
* Solicitud a la base de datos para obtener la orden de productos
* */
  getOrderp() {
    this.apiOrderP.getOrderP().subscribe(reply => {
      console.log(reply);
      this.listOrderP = reply.data;
      var i;
      for (i = 0; i <= this.listOrderP.length - 1; i++) {
        if (this.listOrderP[i].idOrderNavigation.idCustomer == this.idCustomer && this.listOrderP[i].idOrderNavigation.isActive == 1) {
          this.listMyOrders.push(this.listOrderP[i]);
        }
      }
      console.log(this.listMyOrders);
      this.size = this.listMyOrders.length;
    });
  }

/**
* Solicitud a la base de datos para obtener las Ordenes
* */
  getOrder() {
    this.apiOrder.getOrder().subscribe(reply => {
      console.log(reply);
      this.listOrder = reply.data;
      console.log(this.listOrder.length);
    });
  }

/**
* Solicitud a la base de datos para obtener los Productos de los productores
* */
  getProductsP() {
    this.apiProductsP.getPP().subscribe(reply => {
      console.log(reply);
      this.listProductP = reply.data;
    });
  }

}
