import { Component, OnInit } from '@angular/core';
import { ApicustomerService } from '../services/apicustomer.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-general',
    templateUrl: './login-general.component.html',
    styleUrls: ['./login-general.component.scss']
})
/** loginGeneral component*/
export class LoginGeneralComponent implements OnInit{
  public inputPassword;
  public listCustomers;
  model: any = {};
  public cond = true;


    /** loginGeneral ctor */
  constructor(
    private apiCustomer: ApicustomerService,
    private router: Router
) {

  }

  ngOnInit(): void {
    this.getCustomer();
  }
  
  public authorization(listCustomers) {
    var i;
    for (i = 0; i <= this.listCustomers.length-1; i++) {
      if (this.model.user == this.listCustomers[i].userName && this.model.password == this.listCustomers[i].password) {
        this.router.navigate(['/tramo-producto', this.listCustomers[i].userName]);
        this.cond = false;
      }
      
       
    }
    if (this.cond) {
      $('#exampleModal').modal('show')  
    }

    console.log(this.listCustomers.length);
    console.log(this.model.user);
    console.log(this.model.password);
  }

  getCustomer() {
    this.apiCustomer.getCustomer().subscribe(reply => {
      console.log(reply);
      this.listCustomers = reply.data;
    });
  }

}
