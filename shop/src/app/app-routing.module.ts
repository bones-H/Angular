import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {CatalogComponent} from './catalog/catalog.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'catalog', component: CatalogComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
