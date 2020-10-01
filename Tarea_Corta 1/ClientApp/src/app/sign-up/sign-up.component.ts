import { Component } from '@angular/core';
import { customer } from '../Models/customer';
import { ApicustomerService } from '../services/apicustomer.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
/** signUp component*/
export class SignUpComponent {
  model: any = {};


    /** signUp ctor */
  constructor(
    private apiCustomer: ApicustomerService,
    private router: Router

) {

  }


  addCustomer() {
    const customer: customer = { id: parseInt(this.model.id), name: this.model.name, last_name: this.model.lastName, address: this.model.address, birth_date: this.model.birth_date, phone_number: parseInt(this.model.phone_number), user_name: this.model.username, password: this.model.password };

    this.apiCustomer.add(customer).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      
      if (Reply.conexionSuccess === 1) {
        this.router.navigateByUrl('/loginG');
        console.log(customer);
        alert("Cliente agregado exitosamente");
        //this.dialogRef.close(); MATERIAL
        //this.snackBar.open('Cliente agregado', '', { MATERIAL
          //duration: 2000
        //});
      }
    });
  }
}
