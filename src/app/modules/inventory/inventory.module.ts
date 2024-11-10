import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InventoryListComponent } from './pages/inventory-list/inventory-list.component';
import { InventoryCreateComponent } from './pages/inventory-create/inventory-create.component';
import { InventoryUpdateComponent } from './pages/inventory-update/inventory-update.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: InventoryListComponent },
      { path: 'create', component: InventoryCreateComponent },
      { path: 'update/:id', component: InventoryUpdateComponent }
    ])
  ]
})
export class InventoryModule { }
