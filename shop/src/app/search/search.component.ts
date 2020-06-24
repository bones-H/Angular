import {Component} from '@angular/core';
import {GetCatalogService} from '../services/get-catalog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  strSearch = ''



  constructor(public catalog: GetCatalogService) { }



}
