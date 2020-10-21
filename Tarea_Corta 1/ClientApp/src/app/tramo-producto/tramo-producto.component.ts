import { Component, OnInit } from '@angular/core';
import { ApiproducerService } from '../services/apiproducer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiuserService } from '../services/apiuser.service';

@Component({
    selector: 'app-tramo-producto',
    templateUrl: './tramo-producto.component.html',
    styleUrls: ['./tramo-producto.component.scss']
})
/** tramoProducto component*/
export class TramoProductoComponent implements OnInit{
  //public listCustomers: any[];
  public listProducers: any[] = [];
  public listMyProducers = [];
  public listUser;
  public userName;
  public firstName;


    /** tramoProducto ctor */
  constructor(
    private apiProducer: ApiproducerService,
    private apiUser: ApiuserService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  /**
   * Funcion que se ejecuta al inicio
   * */
  ngOnInit(): void {
    this.getUser();
    this.getProducer();
  }

  /**
   * Nos dirijimos a la pagina web del carrito y le agregamos el username al link
   * */
  checkout() {
    this.router.navigate(['/checkout', this.userName]);
  }

  /**
   * Redirecciona a trama de un productor especifico
   * @param i el indice del producto que el usuario escogio
   */
  producers(i) {
    console.log(this.listProducers[i].idProducer);
    this.router.navigate(['/producers', this.userName, this.listProducers[i].name]);
  }

  /**
   * Para editar o eliminar el perfil donde nos encontramos en el momento
   * */
  editDelete() {
    this.router.navigate(['/signup', this.userName]);
  }

  /**
   * Accedemos al API, el cual nos provee retorna una lista con los usuarios
   * Se itera la lista para acceder a los usuarios que son necesarios
   * */
  getUser() {
    this.apiUser.getUser().subscribe(reply => {
      console.log(reply);
      this.listUser = reply.data;

      let user = this.route.snapshot.paramMap.get('userName'); //agarrar el userName del link
      this.userName = user;
      var i;
      for (i = 0; i <= this.listUser.length - 1; i++) { //recorrer la lista con el userName que agarramos 
        if (this.listUser[i].username == user) {
          this.firstName = this.listUser[i].name;
        }
        
      }
    });
  }


  getProducer() {
    this.apiProducer.getProducer().subscribe(reply => {
      console.log(reply);
      this.listMyProducers = reply.data;

      var i;
      for (i = 0; i <= this.listMyProducers.length - 1; i++) { //recorrer la lista con el userName que agarramos 
        if (this.listMyProducers[i].isAccepted == 1) {
          this.listProducers.push(this.listMyProducers[i]);
        }
      }
    });
  }

}
