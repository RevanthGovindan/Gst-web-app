import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import * as io from "socket.io-client";
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  socket = io('http://localhost:8000');
  constructor(private http:Http) { }
  rows=[];
  filtered=[];
  results=[];
  ngOnInit() {
    this.socket.on('address', function (data) {
    console.log(data);
    this.load();
  }.bind(this));
  this.load();
  }
  load=function(){
    this.http.get('http://localhost:8000/load').subscribe(data => {
      this.rows=JSON.parse(data["_body"]);
    });
  }
  
  search=function(event) {
    this.filtered= [];
    var sr=event.query;
    for(let i = 0; i < this.rows.length; i++) {
        let brand = this.rows[i].product_code;
        if(brand.toLowerCase().indexOf(sr.toLowerCase()) == 0) {
            this.filtered.push(brand);
            //this.results.push(this.rows[i]);
        }
    }
  }
  addedproducts=function(event)
  {
      var name=this.val;
      for(let i = 0; i < this.rows.length; i++) {
        let brand = this.rows[i].product_code;
        if(name==brand)
        {
          
            //this.results.push(this.rows[i]);
        }
    }
  }
}
