import { Component, OnInit } from '@angular/core';
import {GetCatalogService} from '../../services/get-catalog.service';
import {GetCartService} from '../../services/get-cart.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  img = 'https://placehold.it/200x150'
  showModal = false
  constructor(public catalog: GetCatalogService,
              public cartService: GetCartService) {}

  ngOnInit(): void {

  }

}
