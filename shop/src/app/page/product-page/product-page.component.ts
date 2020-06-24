import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {GetCatalogService} from '../../services/get-catalog.service';
import {Item} from '../../interfaces';
import {GetCartService} from '../../services/get-cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  img = 'https://placehold.it/350x500'
  product: Item
  constructor(
    private route: ActivatedRoute,
    private catalogService: GetCatalogService,
    public cartService: GetCartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params.id)
      this.product = this.catalogService.getById(+params.id)
      console.log(this.product)
    })
  }

}
