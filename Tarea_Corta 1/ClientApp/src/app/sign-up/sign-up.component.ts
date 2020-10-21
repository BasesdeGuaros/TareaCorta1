import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../Models/user';
import { producer } from '../Models/producer';
import { ApiproducerService } from '../services/apiproducer.service';
import { ApiuserService } from '../services/apiuser.service';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
/** signUp component*/
export class SignUpComponent implements OnInit{
  model: any = {};
  public listUser;
  public isNew;
  public edited = true;

    /** signUp ctor */
  constructor(
   // private apiCustomer: ApicustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiUser: ApiuserService,
    private apiProducer: ApiproducerService
  ) { }

/**
* Funcion que se ejecuta al inicio
* */
  ngOnInit(): void {
    this.isNew = this.activatedRoute.snapshot.paramMap.get('userName');
    this.getUser();
  }

/**
* Accedemos al API, el cual nos provee retorna una lista con los usuarios
* Se itera la lista para acceder a los usuarios que son necesarios
* */
  getUser() {
    this.apiUser.getUser().subscribe(reply => {
      console.log(reply);
      this.listUser = reply.data;

      if (this.isNew != 'null') {
        this.editUserC(this.isNew);
      }
    });
  }


  /**
   * Se hace una solicitud a la base de datos para agregar un nuevo Usuario
   * */
  addUserC() {
    this.edited = true;
    var rolF;
    if (this.model.rol == "Cliente") {
      rolF = "customer";
    } else {
      rolF = "producer";
    }

    const user: user = { idUser: parseInt(this.model.id), name: this.model.name, lastName: this.model.lastName, address: this.model.address, birthDate: this.model.birth_date, phoneNumber: parseInt(this.model.phone_number), username: this.model.username, password: this.model.password, rol: rolF };

    if (this.isNew == 'null') {
      this.apiUser.add(user).subscribe(Reply => {
        console.log(Reply.conexionSuccess);
        console.log(Reply.message);

        if (Reply.conexionSuccess === 1) {
          $('#addModal').modal('show');
          console.log(user);
        }
      });
      if (rolF == "producer") {
        const producer: producer = { id: parseInt(this.model.id), idProducer: 0, sinpe: parseInt(this.model.phone_number), isAccepted: 0 };

        this.apiProducer.add(producer).subscribe(Reply => {
          console.log(Reply.conexionSuccess);
          console.log(Reply.message);

        });
      }
    } else {
      this.edited = false;
      this.apiUser.edit(user).subscribe(Reply => {
        console.log(Reply.conexionSuccess);
        console.log(Reply.message);

        if (Reply.conexionSuccess === 1) {
          console.log(user);
          $('#updateModal').modal('show');
        }
      });
    }
  }


  /**
   * Se hace una solicitud para editar un usuario
   * @param userName sirve para identificar el usuario a editar
   */
  editUserC(userName: string) {
    console.log(userName);
    var i;
    for (i = 0; i <= this.listUser.length - 1; i++) {
      if (userName == this.listUser[i].username) {
        this.model.id = this.listUser[i].idUser;
        this.model.name = this.listUser[i].name;
        this.model.lastName = this.listUser[i].lastName;
        this.model.address = this.listUser[i].address;
        this.model.birth_date = this.listUser[i].birthDate;
        this.model.phone_number = this.listUser[i].phoneNumber;
        this.model.username = this.listUser[i].username;
        this.model.password = this.listUser[i].password;
      }
    }
  }

  /**
   * Se hace una solicitud para eliminar un usuario
   * @param userName sirve para identificar el usuario a editar
   */
  deleteUser(userName: string) {
    var i;
    for (i = 0; i <= this.listUser.length - 1; i++) {
      if (userName == this.listUser[i].username) {
        this.apiUser.delete(this.listUser[i].idUser).subscribe(Reply => {
          console.log(Reply.conexionSuccess);
          if (Reply.conexionSuccess === 1) {
            $('#deleteModal').modal('show');
          }
        });
      }
    }
  }
  
}

