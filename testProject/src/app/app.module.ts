import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapControlComponent } from './map-control/map-control.component';
import { CreateMarkerComponent } from './modal/create-marker/create-marker.component';
import {RefDirective} from './ref.directive';
import { DeleteMarkerComponent } from './modal/delete-marker/delete-marker.component';

@NgModule({
  declarations: [AppComponent, MapComponent, MapControlComponent, CreateMarkerComponent, RefDirective, DeleteMarkerComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  entryComponents: [CreateMarkerComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
