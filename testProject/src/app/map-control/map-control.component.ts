import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {JsonService} from '../service/json.service';
import {PaginationService} from '../service/pagination.service';
import {Marker} from '../interface';


@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css']
})
export class MapControlComponent implements  OnChanges {

  markerType = ''
  markerTitle = ''
  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  @Input() filteredArr: Marker[]

  constructor(
    public serviceHTTP: JsonService,
    private pagerService: PaginationService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.allItems = this.filteredArr
    this.setPage(1)
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  focusMarker($event) {

    this.serviceHTTP.activatedMarker(+$event.target.id)

  }

  blurMarker() {
    this.serviceHTTP.deactivatedMarker(this.serviceHTTP.activatedId)
  }
  createMarker() {
    this.serviceHTTP.newMarker = {
      coordinates: [0, 0],
      id: this.serviceHTTP.lastId + 1,
      type: this.markerType,
      title: this.markerTitle,
      active: false
    }
    this.markerTitle = this.markerType = null
  }



}
