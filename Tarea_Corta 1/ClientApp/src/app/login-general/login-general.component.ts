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

    /** loginGeneral ctor */
  constructor(
    private apiCustomer: ApicustomerService,
    private router: Router
) {

  }

  ngOnInit(): void {
    this.getCustomer();
  }
  
  public authorization() {
    if (this.model.user == this.listCustomers[0].userName && this.model.password == this.listCustomers[0].password) {
      this.router.navigateByUrl('/tramo-producto');
    }
    $('#exampleModal').modal('show')
    
    console.log(this.model.user);
    console.log(this.model.password);
    console.log(this.model.user == this.listCustomers[0].userName && this.model.password == this.listCustomers[0].password);
  }

  getCustomer() {
    this.apiCustomer.getCustomer().subscribe(reply => {
      console.log(reply);
      this.listCustomers = reply.data;
    });
  }

}
