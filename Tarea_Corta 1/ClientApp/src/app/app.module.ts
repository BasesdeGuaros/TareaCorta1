import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginGeneralComponent } from './login-general/login-general.component';
import { TramoProductoComponent } from './tramo-producto/tramo-producto.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProducersComponent } from './producers/producers.component';
import { MainWindowComponent } from './main-window/main-window.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginGeneralComponent,
    TramoProductoComponent,
    SignUpComponent,
    CheckoutComponent,
    ProducersComponent,
    MainWindowComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: '', component: MainWindowComponent },
      { path: 'loginG', component: LoginGeneralComponent },
      { path: 'tramo-producto', component: TramoProductoComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'producers', component: ProducersComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
