import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsRoutingModule } from './claims-routing-module';
import { MaterialModule } from 'src/app/core/modules/material.module';

@NgModule({
  imports: [
    CommonModule,
    ClaimsRoutingModule,
    MaterialModule
  ]
})
export class ClaimsModule { }
