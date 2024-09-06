import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import { ProductInterface } from '../product-interfaces/product-interface';

@Component({
  selector: 'app-product-get',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-get.component.html',
  styleUrl: './product-get.component.css',
})

export class ProductGetComponent {
  products: ProductInterface[] = [];
  constructor(private productsService: ProductsService) {}
  ngOnInit() {
    this.productsService.loadProducts().subscribe({
      next: (products) => {
        console.log('liste des produits chargées avec succès:', products);
        this.products = products;
      },
      error: (error) => {
        console.error(
          `Erreur lors de la récupération de la liste des produits :`,
          error
        );
      },
    });
  }

  handleDeleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe({
      next: (product) => {
        console.log('Produit supprimé avec succès:', product);
        this.products = this.products.filter((p) => p.id !== id);
      },
    });
  }
}
