import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PoliciesRoutingModule } from './policies-routing-module';
import { MaterialModule } from 'src/app/core/modules/material.module';

// Import components for policy management
import { ListPolicyComponent } from './component/list-policy/list-policy.component';
import { NewPolicyComponent } from './component/new-policy/new-policy.component';
import { EditPolicyComponent } from './component/edit-policy/edit-policy.component';
import { DeletePolicyComponent } from './component/delete-policy/delete-policy.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PoliciesRoutingModule,
    FontAwesomeModule,
    ListPolicyComponent,
    NewPolicyComponent,
    EditPolicyComponent,
    DeletePolicyComponent
  ]
})
export class PoliciesModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faEdit, faTrash);
  }
}
