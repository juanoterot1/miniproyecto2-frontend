import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CreditAccountListComponent } from './pages/credit-account-list/credit-account-list.component';
import { CreditAccountCreateComponent } from './pages/credit-account-create/credit-account-create.component';
import { CreditAccountUpdateComponent } from './pages/credit-account-update/credit-account-update.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: CreditAccountListComponent },
      { path: 'create', component: CreditAccountCreateComponent },
      { path: 'update/:id', component: CreditAccountUpdateComponent }
    ])
  ]
})
export class CreditAccountModule { }
