import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MapComponent } from './map/map.component';
import {JsonService} from './service/json.service';
import {HttpClientModule} from '@angular/common/http';

import { MapControlComponent } from './map-control/map-control.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapControlComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
