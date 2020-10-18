import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { orderproducts } from '../Models/orderproducts';
import { order } from '../Models/order'
import { ApiorderService } from '../services/apiorder.service';
import { ApiproducerService } from '../services/apiproducer.service';
import { ApiproductsproducerService } from '../services/apiproductsproducer.service';
import { ApiuserService } from '../services/apiuser.service';
import { ApiorderproductsService } from '../services/apiorderproducts.service';

@Component({
    selector: 'app-producers',
    templateUrl: './producers.component.html',
    styleUrls: ['./producers.component.scss']
})
/** producers component*/
export class ProducersComponent implements OnInit{
  public listProducers: any[];
  public listPP = [];
  public amount = 0;
  public number = 0;
  public subtotal = 0;
  public totalOrder = 0;
  public listUser = [];
  public userName;
  public listNumber;
  public listPurchase = [];
  public producer;
  public listOrder = [];
  public listOrderP;
  public listMyProducers = [];
  model: any = {};
 
    /** producers ctor */
  constructor(
    private apiProducer: ApiproducerService,
    private apiPP: ApiproductsproducerService,
    private router: Router,
    private apiUser: ApiuserService,
    private apiOrderP: ApiorderproductsService,
    private apiOrder: ApiorderService,
    private route: ActivatedRoute) {
  }


  /**
  * Funcion que se ejecuta al inicio
  * */
  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName');
    this.getUser();
    this.getOrder();
    let produ = this.route.snapshot.paramMap.get('producerName'); //agarrar el producerId del link
    this.producer = produ;
    
  }

  /**
   * Crea una lista con los productos solicitados por el cliente
   * @param i indice de los productos
   */
  public refresh(i) {
    if (this.listMyProducers[i].quantity >= this.model.quantity && this.model.quantity > 0) {
      this.listMyProducers[i].quantity -= this.model.quantity;
      let p = { idProduct: this.listMyProducers[i].idProductNavigation.id, product: this.listMyProducers[i].idProductNavigation.product, quantity: this.model.quantity, price: this.listMyProducers[i].price };
      this.listPurchase.push(p);
      console.log(this.listPurchase);
      this.subtotal += this.model.quantity * this.listMyProducers[i].price;
    } else {
      $('#exampleModal').modal('show') 
    }
  }

  /**
   * Elimina los productos de la lista  
   * */
  public delete(j) {
    if (this.listPurchase[j] == undefined) {
      alert('No hay productos agregados');
    } else {

      var i;
      for (i = 0; i <= this.listPurchase.length - 1; i++) {
        if (this.listPurchase[i].product == this.listMyProducers[i].idProductNavigation.product) {
          this.listPurchase.splice(i, 1);
          console.log(this.listPurchase);
        }
      }
    }
  }

  /**
   * Agregar la orden y nos envia a la direccion del carrito
   * */
  checkout() {
    this.addOrder();
    let user = this.route.snapshot.paramMap.get('userName')
    this.router.navigate(['/checkout', user]);
  }

  /**
   * Solicitud a la base de datos para obtener los Productos de los productores
   * */
  getPP() {
    this.apiPP.getPP().subscribe(reply => {
      console.log(reply);
      this.listPP = reply.data;
    })
  }

/**
 * Solicitud a la base de datos para obtener los Productores
 * */
  getProducer() {
    this.apiProducer.getProducer().subscribe(reply => {
    this.listProducers = reply.data;
    this.number = this.listProducers.length;
    })
  }

/**
 * Solicitud a la base de datos para obtener los Usuarios
 * */
  getUser() {
    this.apiUser.getUser().subscribe(reply => {
      console.log(reply);
      this.listUser = reply.data;
      this.apiPP.getPP().subscribe(reply => {
        console.log(reply);
        this.listPP = reply.data;
        this.myProducers();
      });
    });
  }

/**
 * Solicitud a la base de datos para obtener la orden los productos
 * */
  getOrderp() {
    this.apiOrderP.getOrderP().subscribe(reply => {
      console.log(reply);
      this.listOrderP = reply;
    })
  }


  /**
   * Agrega una orden de productos asociada a una orden general
   * 
   * @param k identoificar la orde de productos
   * @param idcustomer identificar la orden general
   */
  addOrderP(k, idcustomer) {
    var w;
    for (w = 0; w <= this.listPurchase.length - 1; w++) {
      var totalP = this.listPurchase[w].quantity * this.listPurchase[w].price;
      console.log('multi')
      console.log(totalP);
    
      const orderP: orderproducts = {
        id: 0,
        idorder: this.listOrder[k].id,
        idproduct: this.listPurchase[w].idProduct,
        quantity: this.listPurchase[w].quantity,
        total: totalP
      };
      this.apiOrderP.add(orderP).subscribe(Reply => {
        console.log(Reply.conexionSuccess);
        console.log(Reply.message);


        if (Reply.conexionSuccess === 1) {
          console.log(orderP);

          this.getOrder();
          console.log(this.listOrder);
          var idP;
          var j;
          for (j = 0; j <= this.listOrder.length - 1; j++) {
            if (this.listOrder[j].idCustomer == idcustomer) {
              idP = this.listOrder[j].id;
              this.totalOrder = this.listOrder[j].subtotal + this.subtotal;
            }
          }

          //Edir de orden ya existente
          const order: order = {
            id: idP,
            idCustomer: idcustomer,
            subtotal: this.totalOrder,
            tax: 0,
            total: 0,
            isActive: 1
          };
          console.log(this.totalOrder);
          this.apiOrder.edit(order).subscribe(Reply => {
            console.log(Reply.conexionSuccess);
            console.log(Reply.message);
          })
        }
      });
    }
  }

/**
 * Solicitud a la base de datos para obtener las ordenes generales
 * */
  getOrder() {
    this.apiOrder.getOrder().subscribe(reply => {
      console.log(reply);
      this.listOrder = reply.data;
    });
  }

/**
 * Agrega una orden general
 * */
  addOrder() {    
    var idcustomer;
    var i;
    for (i = 0; i <= this.listUser.length - 1; i++) {
      if (this.listUser[i].username == this.userName) {
        idcustomer = this.listUser[i].idUser;
      }
    }

    //busca si hay una orden a nombre del cliente y si esa orden esta activa
    var k;
    for (k = 0; k <= this.listOrder.length - 1; k++) {
      if (this.listOrder[k].idCustomer == idcustomer && this.listOrder[k].isActive == 1) {
        //si la orden esta activa entonces se crea una ordenP
        this.addOrderP(k, idcustomer); //meter nueva orden de productos
        return;
      }
    }
    //si no hay una orden activa, se crea una nueva orden    
    const order: order = {
          id: 1,
          idCustomer: idcustomer,
          subtotal: 0, 
          tax: 0,
          total: 0,
          isActive: 1
        };

        this.apiOrder.add(order).subscribe(Reply => {
          console.log(Reply.conexionSuccess);
          console.log(Reply.message);

          if (Reply.conexionSuccess === 1) {
            console.log(order);
          }
        });

        var w;
        for (w = 0; w <= this.listOrder.length - 1; w++) {
          if (this.listOrder[w].username) {
            this.addOrderP(w, idcustomer) //igual se inserta una orden de productos
          }
        }
  }

/**
 * Lista que incluye solamente los product
 * */
  myProducers() {
    let produ = this.route.snapshot.paramMap.get('producerName');
    var idProducer;

    //console.log(this.listUser);
    var k;
    for (k = 0; k <= this.listUser.length - 1; k++) {
      if (this.listUser[k].name == produ) {
        idProducer = this.listUser[k].idUser;
      }
    }

    var i;
    for (i = 0; i <= this.listPP.length - 1; i++) {
      if (this.listPP[i].idProducerNavigation.id == idProducer) {
        this.listMyProducers.push(this.listPP[i]);
      }
    }
  }
}
