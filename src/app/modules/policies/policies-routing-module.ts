import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your policy-related components
import { ListPolicyComponent } from './component/list-policy/list-policy.component';
import { NewPolicyComponent } from './component/new-policy/new-policy.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListPolicyComponent,
    title: 'All Policies'
  },
  {
    path: 'add',
    component: NewPolicyComponent,
    title: 'Add New Policy'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
