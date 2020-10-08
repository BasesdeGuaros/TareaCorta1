import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { AdminComponent } from './admin/admin.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { AfiliacionesComponent } from './afiliaciones/afiliaciones.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ReportesComponent } from './reportes/reportes.component';
import { LoginGeneralComponent } from './login-general/login-general.component';
import { TramoProductoComponent } from './tramo-producto/tramo-producto.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    AdminComponent,
    AdminviewComponent,
    AfiliacionesComponent,
    CategoriasComponent,
    ReportesComponent,
    LoginGeneralComponent,
    TramoProductoComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: '', component: AdminComponent },
      { path: 'adminview', component: AdminviewComponent },
      { path: 'afiliaciones', component: AfiliacionesComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'reportes', component: ReportesComponent},
      { path: 'loging', component: LoginGeneralComponent },
      { path: 'tramo-producto', component: TramoProductoComponent },
      { path: 'signup', component: SignUpComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }









