import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
export interface Item {
  id_product: number
  product_name: string
  price: number
  quantity?: number
}
export interface CartItem {
  amount: number
  contents: Item[]
  countGoods: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  catalog: Item[]
  cart: CartItem
  filtered: Item[]

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get<Item[]>('https://my-json-server.typicode.com/bones-H/myJson/products?_limit=12')
      .subscribe(data => {
        this.catalog = data
        this.filtered = data
      });
    this.http.get<CartItem>('https://my-json-server.typicode.com/bones-H/myJson/cart')
      .subscribe(data => {
        this.cart = data
      })
  }
  filter(search){
    let regexp = new RegExp(search, 'i');
    this.filtered = this.catalog.filter(el => regexp.test(el.product_name));
  }

  addToCart(product: Item) {
    let find = this.cart.contents.find(el => el.id_product === product.id_product);
    if(find){
      find.quantity++
      this.cart.amount = this.cart.amount + find.price
      this.cart.countGoods++
    } else {
      let prod = Object.assign({quantity: 1}, product);
      this.cart.contents.push(prod);
      this.cart.amount = this.cart.amount + prod.price
      this.cart.countGoods++
    }
  }

  deleteFromBasket(cartItem) {
    if(cartItem.quantity > 1){
      cartItem.quantity--
      this.cart.amount = this.cart.amount - cartItem.price
      this.cart.countGoods--
    } else {
      this.cart.contents.splice(this.cart.contents.indexOf(cartItem), 1)
      this.cart.amount = this.cart.amount - cartItem.price
      this.cart.countGoods--
    }
  }
}
