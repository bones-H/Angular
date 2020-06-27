import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';

import { SearchComponent } from './search/search.component';

import {AppRoutingModule} from './app-routing.module';
import { HomePageComponent } from './page/home-page/home-page.component';

import { CatalogPageComponent } from './page/catalog-page/catalog-page.component';
import { ProductPageComponent } from './page/product-page/product-page.component';
import { ModalComponent } from './modal/modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    SearchComponent,
    HomePageComponent,
    CatalogPageComponent,
    ProductPageComponent,
    ModalComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
