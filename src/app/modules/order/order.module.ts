import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderCreateComponent } from './pages/order-create/order-create.component';
import { OrderUpdateComponent } from './pages/order-update/order-update.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: OrderListComponent },
      { path: 'create', component: OrderCreateComponent },
      { path: 'update/:id', component: OrderUpdateComponent }
    ])
  ]
})
export class OrderModule { }
