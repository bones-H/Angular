import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './page/home-page/home-page.component';

import {CatalogPageComponent} from './page/catalog-page/catalog-page.component';
import {ProductPageComponent} from './page/product-page/product-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'catalog', component: CatalogPageComponent},
  {path: 'catalog/:id', component: ProductPageComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
