import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiproducerService } from '../services/apiproducer.service';
import { ApistockService } from '../services/apistock.service';

@Component({
    selector: 'app-producers',
    templateUrl: './producers.component.html',
    styleUrls: ['./producers.component.scss']
})
/** producers component*/
export class ProducersComponent implements OnInit{
  public listProducers: any[];
  public listStock: any[];
  public amount = 0;
  public number = 0;
  public listNumber: number[];
  public userName;
  url: string = "https://localhost:44372/producers";
 
    /** producers ctor */
  constructor(
    private apiProducer: ApiproducerService,
    private apiStock: ApistockService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getProducer();
    this.getStock();
    for (let i = 0; i < this.number; i++) {
      this.listNumber[i] = this.listProducers[i].stock;
    }
  }

  public buy(i) {
    //this.listNumber[i]++;
    if (this.listStock[i].quantity > 0) {
      this.listStock[i].quantity = this.listStock[i].quantity - 1;
      this.amount++;
    } else {
      $('#exampleModal').modal('show')  
    }
  }

  checkout() {
    let user = this.route.snapshot.paramMap.get('userName')
    console.log(user);
    this.router.navigate(['/checkout', user]);
  }

  getStock() {
    this.apiStock.getStock().subscribe(reply => {
      console.log(reply);
      this.listStock = reply.data;

      console.log("hora ci")

    })
  }

  getProducer() {
    this.apiProducer.getProducer().subscribe(reply => {
      
      this.listProducers = reply.data;
      this.number = this.listProducers.length;
    })
  }
}
