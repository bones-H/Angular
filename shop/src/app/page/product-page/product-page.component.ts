import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {GetCatalogService} from '../../services/get-catalog.service';
import {Product} from '../../interfaces';
import {GetCartService} from '../../services/get-cart.service';
import {delay} from 'rxjs/operators';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, flipInX} from 'ng-animate';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  animations: [
    trigger('fade', [
      transition('* => *', useAnimation(fadeIn, {
        params: {
          timing: .4,
        }
      }))
    ])
  ]

})
export class ProductPageComponent implements OnInit {
  img = 'https://placehold.it/350x500'
  product: Product
  constructor(
    private route: ActivatedRoute,
    private catalogService: GetCatalogService,
    public cartService: GetCartService
  ) { }

  ngOnInit(): void {

    this.route.params
      .pipe(delay(600))
      .subscribe((params: Params) => {
        this.product = this.catalogService.getById(+params.id)
        console.log(this.product)

    // this.route.data.subscribe(data => {
    //   this.product = data.item
    //   console.log(this.product)
    })


  }

}
