import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './shared/layout/admin/admin.component';
import { GuestComponent } from './shared/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./modules/dashboard/pages/dashboard-home/dashboard-home').then((c) => c.DashboardHome)
      },
      {
        path: 'claimants',
        loadChildren: () =>
          import('./modules/claimant/claimant-module').then(m => m.ClaimantModule)
      },
      {
        path: 'policies',
        loadChildren: () =>
          import('./modules/policies/policies-module').then(m => m.PoliciesModule)
      },
      {
        path: 'claims',
        loadChildren: () =>
          import('./modules/claims/claims-module').then(m => m.ClaimsModule)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component').then((c) => c.TypographyComponent)
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component').then((c) => c.ElementColorComponent)
      }

    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/pages/authentication/login/login.component').then((c) => c.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/pages/authentication/register/register.component').then((c) => c.RegisterComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
