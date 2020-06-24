import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartItem, Item} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetCartService {
  cart: CartItem
  constructor(private http: HttpClient) { }

  getCatalog(url: string){
    this.http.get<CartItem>(url)
      .subscribe(data => {
        this.cart = data
      });
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
}
