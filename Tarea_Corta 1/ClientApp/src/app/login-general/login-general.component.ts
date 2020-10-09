import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiuserService } from '../services/apiuser.service';

@Component({
    selector: 'app-login-general',
    templateUrl: './login-general.component.html',
    styleUrls: ['./login-general.component.scss']
})
/** loginGeneral component*/
export class LoginGeneralComponent implements OnInit{
  public inputPassword;
  public listUser;
  model: any = {};
  public cond = true;



    /** loginGeneral ctor */
  constructor(
    private apiUser: ApiuserService,
    private router: Router
) {

  }

  ngOnInit(): void {
    this.getUser();
  }
  
  public authorization() {
    var i;
    for (i = 0; i <= this.listUser.length - 1; i++) {
      if (this.model.user == this.listUser[i].username && this.model.password == this.listUser[i].password && this.listUser[i].rol == "customer") {
        this.router.navigate(['/tramo-producto', this.listUser[i].username]);
        this.cond = false;
      }
      
       
    }
    if (this.cond) {
      $('#exampleModal').modal('show')  
    }

    console.log(this.listUser.length);
    console.log(this.model.user);
    console.log(this.model.password);
  }

  getUser() {
    this.apiUser.getUser().subscribe(reply => {
      console.log(reply);
      this.listUser = reply.data;
      
    });
  }

}
