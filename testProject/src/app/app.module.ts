import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MapComponent } from './map/map.component';

import {HttpClientModule} from '@angular/common/http';

import { MapControlComponent } from './map-control/map-control.component';
import {FormsModule} from '@angular/forms';
import {PaginationService} from './service/markers.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapControlComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
