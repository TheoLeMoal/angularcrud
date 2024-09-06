import { Routes } from '@angular/router';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductGetComponent } from './product/product-get/product-get.component';

export const routes: Routes = [
    {path: "add", component: ProductAddComponent},
    {path: "edit:id", component: ProductEditComponent},
    {path: "get", component: ProductGetComponent}
];
