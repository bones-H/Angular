import {Injectable} from '@angular/core';
import {GetCatalogService} from './get-catalog.service';
import {Item} from '../interfaces';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CatalogResolver implements Resolve<Item>{
  constructor(private getCatalogService: GetCatalogService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> | Promise<Item> | Item {
    return this.getCatalogService.getById(+route.params['id'])
  }

}
