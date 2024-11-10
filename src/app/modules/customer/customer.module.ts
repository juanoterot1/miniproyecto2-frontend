import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerCreateComponent } from './pages/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './pages/customer-update/customer-update.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: CustomerListComponent },
      { path: 'create', component: CustomerCreateComponent },
      { path: 'update/:id', component: CustomerUpdateComponent }
    ])
  ]
})
export class CustomerModule { }
