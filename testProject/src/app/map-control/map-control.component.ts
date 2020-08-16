import {Component, ComponentFactoryResolver, Input, ViewChild} from '@angular/core';
import {MarkerService} from '../service/marker.service';
import {Marker} from '../interface';
import {CreateMarkerComponent} from '../modal/create-marker/create-marker.component';
import {RefDirective} from '../ref.directive';
import {DeleteMarkerComponent} from '../modal/delete-marker/delete-marker.component';

@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css'],
})
export class MapControlComponent {

  @ViewChild(RefDirective) refDir: RefDirective;

  constructor(
    public markerService: MarkerService,
    private resolver: ComponentFactoryResolver) {
  }

  showModalCreate(marker) {
    const modalFactory = this.resolver.resolveComponentFactory(DeleteMarkerComponent);
    const component = this.refDir.containerRef.createComponent(modalFactory);
    component.instance.marker = marker;
    component.instance.close.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }

}
