import {Component, OnInit} from '@angular/core';
import {GetCatalogService} from './services/get-catalog.service';
import {GetCartService} from './services/get-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  urlCart = 'https://my-json-server.typicode.com/bones-H/myJson/cart'
  urlCatalog = 'https://my-json-server.typicode.com/bones-H/myJson/products?_limit=12'


  constructor(private catalogService: GetCatalogService,
              private cartService: GetCartService) {

  }

  ngOnInit(): void {
    this.catalogService.getCatalog(this.urlCatalog)
    this.cartService.getCatalog(this.urlCart)
  }




}
