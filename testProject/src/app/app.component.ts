import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testProject';

  showBlock($event) {
    console.log($event)
    if ($event.target.className === 'block') {
      console.log('block')
      $event.target.classList.add("active");
    } else console.log('no block')
    //$event.target.classList.toggle("active");
    //$event.target.onblur.classList.toggle("active");
  }

  hiddenBlock($event) {

    $event.target.classList.remove("active");

  }
}
