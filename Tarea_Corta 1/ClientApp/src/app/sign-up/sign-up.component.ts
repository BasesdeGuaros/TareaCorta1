import { Component, OnInit } from '@angular/core';
import { customer } from '../Models/customer';
import { ApicustomerService } from '../services/apicustomer.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
/** signUp component*/
export class SignUpComponent implements OnInit{
  model: any = {};
  public listCustomers;
  public isNew;



    /** signUp ctor */
  constructor(
    private apiCustomer: ApicustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    
    this.isNew = this.activatedRoute.snapshot.paramMap.get('userName');
    this.getCustomer();

  }

  getCustomer() {
    this.apiCustomer.getCustomer().subscribe(reply => {
      console.log(reply);
      this.listCustomers = reply.data;

      if (this.isNew != 'null') {
        console.log(this.listCustomers.length);
        this.editCustomer(this.isNew);
      }
    });
  }



  addCustomer() {
    const customer: customer = { id: parseInt(this.model.id), name: this.model.name, last_name: this.model.lastName, address: this.model.address, birth_date: this.model.birth_date, phone_number: parseInt(this.model.phone_number), user_name: this.model.username, password: this.model.password };

    if (this.isNew == 'null') {
      this.apiCustomer.add(customer).subscribe(Reply => {
        console.log(Reply.conexionSuccess);
        console.log(Reply.message);

        if (Reply.conexionSuccess === 1) {
          this.router.navigateByUrl('/loginG');
          console.log(customer);
          alert("Cliente agregado exitosamente");
        }
      });
    } else{
      this.apiCustomer.edit(customer).subscribe(Reply => {
        console.log(Reply.conexionSuccess);

        if (Reply.conexionSuccess === 1) {
          //this.router.navigateByUrl('/tramo-');
          console.log(customer);
          alert("Cliente editado exitosamente");
        }
      });
    }
    
  }

  editCustomer(userName: string) {
    console.log(userName);
    var i;
    for (i = 0; i <= this.listCustomers.length - 1; i++) {
      if (userName == this.listCustomers[i].userName) {
        this.model.id = this.listCustomers[i].id;
        this.model.name = this.listCustomers[i].name;
        this.model.lastName = this.listCustomers[i].lastName;
        this.model.address = this.listCustomers[i].address;
        this.model.birth_date = this.listCustomers[i].birthDate;
        this.model.phone_number = this.listCustomers[i].phoneNumber;
        this.model.username = this.listCustomers[i].userName;
        this.model.password = this.listCustomers[i].password;
      }
    }
  }

  deleteCustomer(userName: string) {
    var i;
    for (i = 0; i <= this.listCustomers.length - 1; i++) {
      if (userName == this.listCustomers[i].userName) {
   
        this.apiCustomer.delete(this.listCustomers[i].id).subscribe(Reply => {
          console.log(Reply.conexionSuccess);
      

          if (Reply.conexionSuccess === 1) {
            this.router.navigateByUrl('/loginG');
            alert("Cliente eliminado exitosamente");
          }
        });
      }
    }

    
  }
}
