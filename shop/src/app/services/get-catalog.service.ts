import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Product} from '../interfaces';



@Injectable({
  providedIn: 'root'
})
export class GetCatalogService {
  catalog: Product[] = []
  filtered: Product[] = []

  constructor(private http: HttpClient) { }

  getCatalog(url) {
    this.http.get<Product[]>(url)
      .subscribe(data => {
        this.catalog.push(...data)
        this.filtered.push(...data)
      })
  }
  filter(search){
    let regexp = new RegExp(search, 'i');
    this.filtered = this.catalog.filter(el => regexp.test(el.product_name));
  }
  getById(id: number): Product {
    return this.filtered.find(el => el.id_product === id)
  }
}
