import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import {
  NewProductInterface,
  ProductInterface,
} from '../product-interfaces/product-interface';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent {
  id!: string | null;
  product!: ProductInterface | null;
  productForm!: FormGroup;
  isSubmitted = false;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(
        `Id du produit récupéré dans le chemin `,
        this.id
      );
      if (this.id) {
        this.productsService.loadOneProduct(this.id).subscribe({
          next: (product) => {
            console.log('produit chargé avec succès:', product);
            this.product = product;
            this.productForm = this.fb.group({
              name: [
                this.product ? this.product.name : '',
                Validators.required,
              ],
              description: [this.product ? this.product.description : ''],
              price: [
                this.product ? this.product.price : null,
                [Validators.required, Validators.min(0)],
              ],
            });
          },
          error: (error) => {
            console.error(
              `Erreur lors de la récupération du produit :`,
              error
            );
            // Gérez l'erreur (par exemple, affichez un message à l'utilisateur)
          },
        });
      }
    });
  }
  register() {
    this.isSubmitted = true;
    console.log(`Dans register de product edit `);
    if (this.productForm.valid) {
      const upProduct: NewProductInterface = this.productForm.value;
      console.log(`Ajout du produit`, upProduct);
      // Souscription à l'observable retourné par patchProduct
      if (this.product && this.product.id) {
        this.productsService
          .patchProduct(this.product.id, upProduct)
          .subscribe({
            next: (response) => {
              console.log('Produit modifié avec succès:', response);
              // Réinitialisez le formulaire ou naviguez vers une autre page
              this.productForm.reset();
              this.isSubmitted = false;
              this.router.navigate(['/get']);
            },
            error: (error) => {
              console.error(
                `Erreur lors de la modification du produit:`,
                error
              );
            },
          });
      }
    } else
      console.log(`Problème lors de l'ajout du formulaire`);
  }
}
