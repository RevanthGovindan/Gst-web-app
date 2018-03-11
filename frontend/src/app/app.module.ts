import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }          from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductslistComponent } from './productslist/productslist.component';
import { RouterModule } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
    ProductslistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{path:'',component:ProductslistComponent}]),
    InputTextModule,
    HttpModule,
    FormsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
