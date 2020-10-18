
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

  ngOnInit(): void{
    this.getUser();
    this.getProducer();
  }

  getUser() {
    this.apiUser.getProducer('producer').subscribe(reply => {
      console.log(reply);
      this.listUser = reply.data;

      /*
      var i;
      for (i = 0; i < this.listUser.length; i++) {
        if (this.listUser[i].producers[0].isAccepted = 0) {
          this.afilNumber++;
        }
      }
      */
    });
  }
  getProducer() {
    this.apiProducer.getProducer().subscribe(reply => {
      console.log(reply);
      this.listProducer = reply.data;

    });
  }

  addUserC() {
    this.model.afil = 1;
    const user: user = { idUser: parseInt(this.model.id), name: this.model.name, lastName: this.model.lastName, address: this.model.location, birthDate: this.model.birthD, phoneNumber: parseInt(this.model.phone), username: this.model.user, password: this.model.password, rol: "producer" };
    const producer: producer = { id: parseInt(this.model.id), sinpe: parseInt(this.model.sinpe), isAccepted: 1 };
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

  model: any = {};
  model2: any = {};
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

  addAfiliation(): void {
    var asnwer = confirm("Are you sure you want to add this productor? ");

    if (asnwer) {


      this.listUser[this.currentAfiliation] = this.model4;
      this.model4.afil = 1;
      this.model4 = {};

    }

  }

  deleteAfiliation(ident): void {
    var i;
    for (i = 0; i < this.listUser.length; i++) {
      if (this.listUser[i].id == ident) {
        this.listUser.splice(i,1);
      }
    }
  }

  plusAfilNumber(): void {
    this.afilNumber++;
  }

  resetAfiliationNumber(): void {

    this.afilNumber = 0;
  }



  addProductor(): void {
    this.model.afil = 1;
    this.listUser.push(this.model);
    this.model = {};

  }

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

  updateProductor(): void {

    var asnwer = confirm("are you sure you want to update this productor? ");

    if (asnwer) {

      this.model2.afil = 1;
      this.listUser[this.currentProductorUpdate] = this.model2;
      this.model2 = {};

    }

  }

}

