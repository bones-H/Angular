import {Injectable} from '@angular/core';
import {Marker} from '../interface';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  pageSize = 5;
  totalItems: Marker[];
  paginationObj = {
    pageNumbers: undefined,
    currentPage: 1,
    pageContent: undefined
  };

  constructor() {
  }

  getPagination(totalItems: Marker[]) {
    this.totalItems = totalItems;
    const totalPages = Math.ceil(this.totalItems.length / this.pageSize);
    this.paginationObj.pageNumbers = Array.from(Array(totalPages).keys()).map(i => 1 + i);
    this.setPage(this.paginationObj.currentPage);
  }

  setPage(page: number) {
    let startIndex = (page - 1) * this.pageSize;
    let endIndex = Math.min(startIndex + this.pageSize - 1, this.totalItems.length - 1);
    this.paginationObj.pageContent = this.totalItems.slice(startIndex, endIndex + 1);
    this.paginationObj.currentPage = page;
  }

  findPage(index: number) {
    let foundPage = Math.ceil((index + 1) / this.pageSize);
    this.setPage(foundPage);
  }
}
