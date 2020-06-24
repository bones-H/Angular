import { Component, OnInit } from '@angular/core';
import {GetCatalogService} from '../services/get-catalog.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  img = 'https://placehold.it/200x300'
  constructor(private catalogService: GetCatalogService) { }

  ngOnInit(): void {
  }

}
