import { Component, OnInit } from '@angular/core';
import {GetCatalogService} from '../../services/get-catalog.service';
import {GetCartService} from '../../services/get-cart.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {bounce, fadeIn, flipInX} from 'ng-animate';


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', useAnimation(fadeIn))
    ])
  ]
})
export class CatalogPageComponent implements OnInit {

  img = 'https://placehold.it/200x150'
  showModal = false
  constructor(public catalogService: GetCatalogService,
              public cartService: GetCartService) {}

  ngOnInit(): void {

  }

}
