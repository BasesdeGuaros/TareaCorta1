import { Component, OnInit } from '@angular/core';
import { ApicustomerService } from '../services/apicustomer.service';
import { ApiproducerService } from '../services/apiproducer.service';

@Component({
    selector: 'app-tramo-producto',
    templateUrl: './tramo-producto.component.html',
    styleUrls: ['./tramo-producto.component.scss']
})
/** tramoProducto component*/
export class TramoProductoComponent implements OnInit{
  public listCustomers: any[];
  public listProducers: any[];

    /** tramoProducto ctor */
  constructor(
    private apiCustomer: ApicustomerService,
    private apiProducer: ApiproducerService) {
  }

  ngOnInit(): void {
    this.getCustomer();
    this.getProducer();
  }

  getCustomer() {
    this.apiCustomer.getCustomer().subscribe(reply => {
      console.log(reply);
      this.listCustomers = reply.data;
    });
  }

  getProducer() {
    this.apiProducer.getProducer().subscribe(reply => {
      console.log(reply);
      this.listProducers = reply.data;
    })
  }


}
