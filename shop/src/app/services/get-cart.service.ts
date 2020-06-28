import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cart, Product} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetCartService {
  cart: Cart

  constructor(private http: HttpClient) { }

  getCatalog(url: string){
    this.http.get<Cart>(url)
      .subscribe(data => {
        this.cart = data
        //this.contents = data.contents
      });
  }
  // Из за невозможности вносить изменения в JSON пришлось обойтись без REST API и хранить корзину локально
  deleteFromBasket(cartProduct) {
    if(cartProduct.quantity > 1){
      cartProduct.quantity--
      this.cart.amount = this.cart.amount - cartProduct.price
      this.cart.countGoods--
      //тут должен был быть PUT запрос
    } else {
      this.cart.contents.splice(this.cart.contents.indexOf(cartProduct), 1)
      this.cart.amount = this.cart.amount - cartProduct.price
      this.cart.countGoods--
      //тут должен был быть DELETE запрос
    }
  }
  //далее должны идти запросы PUT и POST соответственно
  addToCart(product: Product) {
    let find = this.cart.contents.find(el => el.id_product === product.id_product);
    if(find){
      find.quantity++
      this.cart.amount = this.cart.amount + find.price
      this.cart.countGoods++
    } else {
      let cartProduct = Object.assign({quantity: 1}, product);
      this.cart.contents.push(cartProduct);
      this.cart.amount = this.cart.amount + cartProduct.price
      this.cart.countGoods++
    }
  }
}
