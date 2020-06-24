import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartItem, Item} from '../app.component';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  img = 'https://placehold.it/70x100'
  @Input() cart: CartItem
  @Output() removeItem = new EventEmitter<Item>()
  showCart = false

  constructor() {

  }

  ngOnInit(): void {

  }

  remove(cartItem) {
    this.removeItem.emit(cartItem)
  }
}
