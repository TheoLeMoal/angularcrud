import { Injectable } from '@angular/core';
import {
  NewProductInterface,
  PatchProductInterface,
  ProductInterface,
} from './product-interfaces/product-interface';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  static url = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  addProduct(product: NewProductInterface): Observable<ProductInterface> {
    console.log(`Dans addProduct de ProductsService`, product);
    return this.http.post<ProductInterface>(ProductsService.url, product);
  }

  loadProducts(): Observable<ProductInterface[]> {
    console.log(`Dans loadProduct de ProductsService`);
    return this.http.get<ProductInterface[]>(ProductsService.url);
  }

  loadOneProduct(id: string): Observable<ProductInterface> {
    console.log(`Dans loadOneProduct de ProductsService`);
    return this.http.get<ProductInterface>(`${ProductsService.url}/${id}`);
  }

  patchProduct(
    id: string,
    partialProduct: PatchProductInterface
  ): Observable<ProductInterface> {
    console.log(`Dans patchProduct de ProductsService`);
    return this.http.patch<ProductInterface>(
      `${ProductsService.url}/${id}`,
      partialProduct
    );
  }

  deleteProduct(id: string): Observable<ProductInterface> {
    console.log(`Dans deleteProduct de ProductsService`);
    return this.http.delete<ProductInterface>(`${ProductsService.url}/${id}`);
  }
}
