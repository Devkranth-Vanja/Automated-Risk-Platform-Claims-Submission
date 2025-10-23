// src/app/modules/claims/claims-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewClaim } from './new-claim/new-claim';
import { ClaimList } from './claim-list/claim-list';
import { ClaimDetails } from './claim-details/claim-details';

const routes: Routes = [
  { path: '', redirectTo: 'claim-list', pathMatch: 'full' },
  { path: 'new-claim', component: NewClaim },
  { path: 'claim-list', component: ClaimList },
  { path: 'claim-details/:id', component: ClaimDetails }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NewClaim,
    ClaimList,
    ClaimDetails
  ],
  exports: [RouterModule]
})
export class ClaimsRoutingModule {}
