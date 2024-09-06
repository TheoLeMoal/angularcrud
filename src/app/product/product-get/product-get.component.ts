import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import { ProductInterface } from '../product-interfaces/product-interface';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-get',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css'],
})
export class ProductGetComponent {
  products: ProductInterface[] = [];
  productIdToDelete: string | null = null;

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit() {
    this.productsService.loadProducts().subscribe({
      next: (products) => {
        console.log('Liste des produits chargées avec succès:', products);
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

  editProduct(id: string) {
    this.router.navigate(['/edit', id]);
  }

  confirmDeleteProduct(id: string) {
    this.productIdToDelete = id;
  }

  cancelDelete() {
    this.productIdToDelete = null;
  }

  handleDeleteProduct() {
    if (this.productIdToDelete) {
      this.productsService.deleteProduct(this.productIdToDelete).subscribe({
        next: () => {
          console.log('Produit supprimé avec succès');
          this.products = this.products.filter(
            (p) => p.id !== this.productIdToDelete
          );
          this.productIdToDelete = null;
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du produit :', error);
        },
      });
    }
  }
}
