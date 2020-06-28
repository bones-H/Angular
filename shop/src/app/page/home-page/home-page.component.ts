import { Component, OnInit } from '@angular/core';
import {animate, group, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, flipInX, tada} from 'ng-animate';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('fade', [
      transition('* => *', useAnimation(fadeIn))
    ]),
    trigger('Shake', [
      transition('* => *', [
        group([
          useAnimation(tada),
          animate(800, style({
            color: 'darkorange'
          }))
        ]),
        animate(1000, style({
          color: 'black'
        }))

      ])

    ])]
})
export class HomePageComponent implements OnInit {
  show = false
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {this.show = true}, 1500)
  }

}
