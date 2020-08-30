import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {MarkerService} from '../service/marker.service';
import {RefDirective} from '../ref.directive';
import {DeleteMarkerComponent} from '../modal/delete-marker/delete-marker.component';
import {PaginationService} from '../service/pagination.service';


@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css'],
})
export class MapControlComponent {

  @ViewChild(RefDirective) refDir: RefDirective;

  constructor(
    public markerService: MarkerService,
    public paginationService: PaginationService,
    private resolver: ComponentFactoryResolver) {
  }

  showModalDelete(marker) {
    const modalFactory = this.resolver.resolveComponentFactory(DeleteMarkerComponent);
    const component = this.refDir.containerRef.createComponent(modalFactory);
    component.instance.marker = marker;
    component.instance.close.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }

  setPage(page: number) {
    this.paginationService.setPage(page);
  }
}
