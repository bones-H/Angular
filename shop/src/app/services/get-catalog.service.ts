import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Item} from '../interfaces';
import {GetCartService} from './get-cart.service';


@Injectable({
  providedIn: 'root'
})
export class GetCatalogService {
  catalog: Item[];

  filtered: Item[]
  constructor(private http: HttpClient) { }

  getCatalog(url) {
    this.http.get<Item[]>(url)
      .subscribe(data => {
        this.catalog = data
        this.filtered = data
      });
  }
  filter(search){
    let regexp = new RegExp(search, 'i');
    this.filtered = this.catalog.filter(el => regexp.test(el.product_name));
  }
  getById(id: number) {
    console.log('1')
    //while (!this.filtered.length){console.log('wait')}
    console.log('2')
    return this.filtered.find(el => el.id_product === id)
  }
}
