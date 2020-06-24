import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../interfaces';




@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  img = 'https://placehold.it/200x150'

  @Input() catalog: Item[]
  @Output() addProduct = new EventEmitter<Item>()

  constructor() {

  }

  ngOnInit(): void {

  }
  buyProduct(item) {
    this.addProduct.emit(item)
    console.log(item)
  }

  newProducts() {

  }
}
