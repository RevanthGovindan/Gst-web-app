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

  ngOnInit() {
    this.socket.on('address', function (data) {
      
    }.bind(this));
  }
  load=function(){
    alert(this.code);
    const body={code:this.code,name:this.name1,price:this.price,gst:this.gst};
    this.http.post('http://localhost:8000/addproduct',body).subscribe();
  }

}
