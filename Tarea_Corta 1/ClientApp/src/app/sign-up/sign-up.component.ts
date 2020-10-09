import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../Models/user';
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



    /** signUp ctor */
  constructor(
   // private apiCustomer: ApicustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiUser: ApiuserService,

  ) { }

  ngOnInit(): void {
    
    this.isNew = this.activatedRoute.snapshot.paramMap.get('userName');

    this.getUser();
  }

  getUser() {
    this.apiUser.getUser().subscribe(reply => {
      console.log(reply);
      this.listUser = reply.data;

      if (this.isNew != 'null') {
        console.log(this.isNew);
        this.editUserC(this.isNew);
      }
    });
  }

  /*
  getCustomer() {
    this.apiCustomer.getCustomer().subscribe(reply => {
      console.log(reply);
      this.listCustomers = reply.data;

      if (this.isNew != 'null') {
        console.log(this.listCustomers.length);
        this.editCustomer(this.isNew);
      }
    });
  }*/



  addUserC() {
    const user: user = { idUser: parseInt(this.model.id), name: this.model.name, lastName: this.model.lastName, address: this.model.address, birthDate: this.model.birth_date, phoneNumber: parseInt(this.model.phone_number), username: this.model.username, password: this.model.password, rol: "customer" };
    if (this.isNew == 'null') {
      this.apiUser.add(user).subscribe(Reply => {
        console.log(Reply.conexionSuccess);
        console.log(Reply.message);

        if (Reply.conexionSuccess === 1) {
          this.router.navigateByUrl('/loginG');
          console.log(user);
          $('#addModal').modal('show');
        }
      });
    } else{
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

  deleteUser(userName: string) {
    var i;
    for (i = 0; i <= this.listUser.length - 1; i++) {
      if (userName == this.listUser[i].username) {
        this.apiUser.delete(this.listUser[i].idUser).subscribe(Reply => {
          console.log(Reply.conexionSuccess);
          if (Reply.conexionSuccess === 1) {
            this.router.navigateByUrl('/loginG');
            $('#deleteModal').modal('show');
          }
        });
      }
    }
  }
  
}

