
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../Models/user';
import { producer } from '../Models/producer';
import { ApiuserService } from '../services/apiuser.service';
import { ApiproducerService } from '../services/apiproducer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public listUser = [];
  public listProducer = [];
  public afilNumber = 0;

  constructor(
    private apiUser: ApiuserService,
    private apiProducer: ApiproducerService) {

  }

  /**
   *Funcion que se realiza cuando se carga la pagina
   * */
  ngOnInit(): void{
    this.getUser();
    this.getProducer();
  }

/**
* Solicitud a la base de datos para obtener los Usuarios
* */
  getUser() {
    this.apiUser.getProducer('producer').subscribe(reply => {
      console.log(reply);
      this.listUser = reply.data;
    });
  }

/**
* Solicitud a la base de datos para obtener los Productores
* */
  getProducer() {
    this.apiProducer.getProducer().subscribe(reply => {
      console.log(reply);
      this.listProducer = reply.data;


      var i;
      for (i = 0; i <= this.listProducer.length - 1; i++) {
        console.log(this.listProducer[i].isAccepted)
        if (this.listProducer[i].isAccepted == 0) {
          this.afilNumber += 1;
        }
      }
      

    });
  }
/**
 * Solicitud a la base de datos para agregar los Productores
 * */
  addUserC() {
    this.model.afil = 1;
    const user: user = { idUser: parseInt(this.model.id), name: this.model.name, lastName: this.model.lastName, address: this.model.location, birthDate: this.model.birthD, phoneNumber: parseInt(this.model.phone), username: this.model.user, password: this.model.password, rol: "producer" };
    const producer: producer = { id: parseInt(this.model.id), idProducer:0, sinpe: parseInt(this.model.sinpe), isAccepted: 1 };
    console.log(producer);
    this.apiUser.add(user).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      console.log(Reply.message);
    });

    
    this.apiProducer.add(producer).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      console.log(Reply.message);

    });
  }

  model2: any = {};
  model: any = {};
  model4: any = {};

  currentProductorUpdate;
  currentCategoryUpdate;
  currentAfiliation;


  activateModal(): void {
    $('#addModal').modal('show');
  }

  activateModal3(i): void {
    this.loadAfiliation(i);
    $('#aceptAfilModal').modal('show');


  }
/**
 * Carga la información de una solicitud de usuario a un modelo
 * @param i indice de la tabla a cargar
 */
  loadAfiliation(i): void {

    this.model4.name = this.listUser[i].name;
    this.model4.lastName = this.listUser[i].lastName;
    this.model4.id = this.listUser[i].idUser;
    this.model4.location = this.listUser[i].address;
    this.model4.birthD = this.listUser[i].birthDate;
    this.model4.phone = this.listUser[i].phoneNumber;
    this.model4.sinpe = this.listUser[i].producers[0].sinpe;
    this.model4.user = this.listUser[i].username;
    this.model4.password = this.listUser[i].password;

    this.currentAfiliation = i;
  }

  /**
   * Añade un nuevo elemento productor a la tabla si se acepta la afiliación
   * */
  addAfiliation(): void {
    var id;
    var i;
    for (i = 0; i <= this.listProducer.length - 1; i++) {
      if (this.listProducer[i].id == this.model4.id) {
        id = this.listProducer[i].idProducer;
      }
    }

    const producer: producer = {
      id: this.model4.id,
      idProducer: id,
      sinpe: parseInt(this.model4.sinpe),
      isAccepted: 1
    };
    console.log(producer)

    this.apiProducer.edit(producer).subscribe(Reply => {
        console.log(Reply.conexionSuccess);
        console.log(Reply.message);
      });

      this.listUser[this.currentAfiliation] = this.model4;
      this.model4.afil = 1;
      this.model4 = {};
  }

  /**
   * Busca en la lista de usuarios y productores y elimina de acuerdo a un índice
   * @param ident indice del usuario a eliminar
   */
  deleteAfiliation(ident): void {
    var i;
    for (i = 0; i < this.listUser.length; i++) {
      if (this.listUser[i].id == ident) {
        this.listUser.splice(i,1);
      }
    }
  }

/**
* Replica la información de la base de datos de la tabla productor
* */
  addProductor(): void {
    this.model.afil = 1;
    this.listUser.push(this.model);
    this.model = {};
  }

  /**
   *
   * Busca en la lista de usuarios y productores y elimina de acuerdo a un índice
   * @param i
   */
  deleteProductor(i): void {
    var asnwer = confirm("are you sure you want to delete this productor? ");
    if (asnwer) {
      this.listUser.splice(i, 1);
    }
  }

  editProductor(i): void {
    this.model2.name = this.listUser[i].name;
    this.model2.lastName = this.listUser[i].lastName;
    this.model2.id = this.listUser[i].idUser;
    this.model2.location = this.listUser[i].address;
    this.model2.birthD = this.listUser[i].birthDate;
    this.model2.phone = this.listUser[i].phoneNumber;
    this.model2.sinpe = this.listUser[i].producers[0].sinpe;
    this.model2.user = this.listUser[i].username;
    this.model2.password = this.listUser[i].password;
    this.currentProductorUpdate = i;

    
  }

  /**
   *Actualiza los datos del productor en las tablas
   * */
  updateProductor(): void {
    var id;
    var j;
    for (j = 0; j <= this.listProducer.length - 1; j++) {
      if (this.listProducer[j].id == this.model2.id) {
        id = this.listProducer[j].idProducer;
      }
    }

    const user: user = {
      idUser: parseInt(this.model2.id),
      name: this.model2.name,
      lastName: this.model2.lastName,
      address: this.model2.location,
      birthDate: this.model2.birthD,
      phoneNumber: parseInt(this.model2.phone),
      username: this.model2.user,
      password: this.model2.password,
      rol: "producer"
    };

    const producer: producer = {
      id: this.model2.id,
      idProducer: id,
      sinpe: parseInt(this.model2.sinpe),
      isAccepted: 1
    };

    this.apiUser.edit(user).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      console.log(Reply.message);
    });

    this.apiProducer.edit(producer).subscribe(Reply => {
      console.log(Reply.conexionSuccess);
      console.log(Reply.message);
    });
   

  }

}

