import { Component, OnInit } from '@angular/core';
import { receive } from '../Models/receive';
import { ApireceiveService } from '../services/apireceive.service';


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
/** checkout component*/
export class CheckoutComponent implements OnInit{
  public listReceives;

    /** checkout ctor */
  constructor(
    private apiReceive: ApireceiveService
    ) {

  }
  
  ngOnInit(): void {
    this.getReceive();
  }

  getReceive() {
    this.apiReceive.getReceive().subscribe(reply => {
      console.log(reply);
      this.listReceives = reply.data;
    });
  }
  
  addReceive() {
    const receive: receive = { id:2, customer: 'sing', price: 500, products: 'Tomate' };
    this.apiReceive.add(receive).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      
      if (Reply.conexionSuccess === 1) {
        alert("Compra realizada");
        //this.dialogRef.close(); MATERIAL
        //this.snackBar.open('Cliente agregado', '', { MATERIAL
          //duration: 2000
        //});
      }
    });
  }
}
