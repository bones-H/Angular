import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {GetCartService} from '../services/get-cart.service';





@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  img = 'https://placehold.it/70x100'

  showCart = false



  constructor(public cartService: GetCartService) {}

}
