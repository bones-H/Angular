import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  strSearch = ''

  @Output() search = new EventEmitter()


  constructor() { }

  userSearch() {
    console.log(this.strSearch)
    this.search.emit(this.strSearch)
  }

}
