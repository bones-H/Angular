import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {GetCartService} from '../services/get-cart.service';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, fadeInLeft, fadeOutLeft, fadeOutRight, lightSpeedIn, lightSpeedOut} from 'ng-animate';






@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('show', [
      transition(':enter', useAnimation(lightSpeedIn, {
        params: {
          timing: .2,
        }
        })),
      transition(':leave', useAnimation(lightSpeedOut, {
        params: {

          timing: .3
        }
      }))

    ]),
    trigger('fade', [
      transition(':enter', useAnimation(fadeIn))
    ])
  ]
})
export class CartComponent implements OnInit {
  img = 'https://placehold.it/70x100'

  showCart = true




  constructor(public cartService: GetCartService) {}

  ngOnInit(): void {


  }

}
