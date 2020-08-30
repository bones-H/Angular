import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {RefDirective} from './ref.directive';
import {CreateMarkerComponent} from './modal/create-marker/create-marker.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(RefDirective) refDir: RefDirective;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  showModalCreate() {
    const modalFactory = this.resolver.resolveComponentFactory(CreateMarkerComponent);
    const component = this.refDir.containerRef.createComponent(modalFactory);
    component.instance.close.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }
}

