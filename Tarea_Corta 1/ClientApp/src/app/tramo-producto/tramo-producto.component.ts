import { Component, OnInit } from '@angular/core';
import { ApicustomerService } from '../services/apicustomer.service';
import { ApiproducerService } from '../services/apiproducer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApistockService } from '../services/apistock.service';

@Component({
    selector: 'app-tramo-producto',
    templateUrl: './tramo-producto.component.html',
    styleUrls: ['./tramo-producto.component.scss']
})
/** tramoProducto component*/
export class TramoProductoComponent implements OnInit{
  public listCustomers: any[];
  public listProducers: any[];
  public listStock: any[];
  public userName;
  public firstName;


    /** tramoProducto ctor */
  constructor(
    private apiCustomer: ApicustomerService,
    private apiProducer: ApiproducerService,
    private apiStock: ApistockService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getCustomer();
    this.getProducer();
    this.getStock();
 
  }

  checkout() {
    this.router.navigate(['/checkout', this.userName]);
  }

  producers() {
    this.router.navigate(['/producers', this.userName]);
  }

  editDelete() {
    this.router.navigate(['/signup', this.userName]);
  }


  getStock() {
    this.apiStock.getStock().subscribe(reply => {
      console.log(reply);
      this.listStock = reply.data;

      console.log("hora ci")

    })
  }

  getCustomer() {
    this.apiCustomer.getCustomer().subscribe(reply => {
      console.log(reply);
      this.listCustomers = reply.data;

      let user = this.route.snapshot.paramMap.get('userName'); //agarrar el userName del link
      this.userName = user;
      var i;
      for (i = 0; i <= this.listCustomers.length - 1; i++) { //recorrer la lista con el userName que agarramos 
        if (this.listCustomers[i].userName == user) {
          this.firstName = this.listCustomers[i].name;
        }
      }
    });
  }

  getProducer() {
    this.apiProducer.getProducer().subscribe(reply => {
      console.log(reply);
      this.listProducers = reply.data;
      console.log(this.listProducers[0].product.product);
    })
  }


}
