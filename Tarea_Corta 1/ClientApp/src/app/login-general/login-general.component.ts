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
) {}

  /**
  * Funcion que se ejecuta al inicio
  * */
  ngOnInit(): void {
    this.getUser();
  }


  /**
   * Verifica si el usuario y contrasena ingresadas estan en la base de datos
   * */
  public authorization() {
    var i;
    for (i = 0; i <= this.listUser.length - 1; i++) {
      if (this.model.user == this.listUser[i].username && this.model.password == this.listUser[i].password) {
        if (this.listUser[i].rol == "customer") {
          this.router.navigate(['/tramo-producto', this.listUser[i].username]);
          this.cond = false;

        } else if (this.listUser[i].rol == "producer") {
          this.router.navigate(['/productor', this.listUser[i].idUser]);
          this.cond = false;
        }
      } else if (this.model.user == "admin" && this.model.password == "admin") {
        this.router.navigate(['/admin']);
        this.cond = false;
      }
    }
    if (this.cond) {
      $('#exampleModal').modal('show')  
    }


  }
  /**
  * Solicitud a la base de datos para obtener los Usuarios
  * */
  getUser() {
    this.apiUser.getUser().subscribe(reply => {
      console.log(reply);
      this.listUser = reply.data;
    });
  }

}
