import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewClaimantComponent } from './components/new-claimant/new-claimant.component';
import { ListClaimantsComponent } from './components/list-claimants/list-claimants.component';
import { EditClaimantComponent } from './components/edit-claimant/edit-claimant.component';


const routes: Routes = [
  { path: '', redirectTo: 'claimant-list', pathMatch: 'full' },
  { path: 'new-claimant', component: NewClaimantComponent },
  { path: 'claimant-list', component: ListClaimantsComponent },
  { path: 'edit-claimant/:id', component: EditClaimantComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimantRoutingModule { }
