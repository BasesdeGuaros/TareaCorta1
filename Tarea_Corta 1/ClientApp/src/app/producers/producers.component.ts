import { Component, OnInit } from '@angular/core';
import { ApiproducerService } from '../services/apiproducer.service';

@Component({
    selector: 'app-producers',
    templateUrl: './producers.component.html',
    styleUrls: ['./producers.component.scss']
})
/** producers component*/
export class ProducersComponent implements OnInit{
  public listProducers: any[];
  public amount = 0;
  public number = 0;
  public listNumber: number[];

 
    /** producers ctor */
  constructor(
    private apiProducer: ApiproducerService) {

  }

  ngOnInit(): void {
    this.getProducer();

    for (let i = 0; i < this.number; i++) {
      this.listNumber[i] = this.listProducers[i].stock;
    }
  }

  public buy(i) {
    this.listNumber[i]++;
    this.listProducers[i].stock = this.listProducers[i].stock - 1;
  }


  getProducer() {
    this.apiProducer.getProducer().subscribe(reply => {
      
      this.listProducers = reply.data;
      this.number = this.listProducers.length;
    })
  }
}
