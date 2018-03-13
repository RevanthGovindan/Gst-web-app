import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import * as io from "socket.io-client";
@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css']
})
export class ProductslistComponent implements OnInit {
  socket = io('http://localhost:8000');
  constructor(private http:Http) { }
  rows=[];
  ngOnInit() {
    this.socket.on('address', function (data) {
    console.log(data);
    this.load();
  }.bind(this));
  this.load();
  }
  load=function(){
    this.http.get('http://localhost:8000/load').subscribe(data => {
      // Read the result field from the JSON response.
      this.rows=JSON.parse(data["_body"]);
    });
  }


  insert=function(){
    const body={code:this.code,name:this.name1,price:this.price,gst:this.gst};
    this.http.post('http://localhost:8000/addproduct',body).subscribe();
  }
  update=function(product){
    const body={code:product.product_code,name:product.product_name,price:product.product_price,gst:product.product_gst};
    this.http.post('http://localhost:8000/update',body).subscribe();
  }
  delete=function(product)
  {
    const body={name:product.product_name};
    this.http.post('http://localhost:8000/delete',body).subscribe();
  }
}
