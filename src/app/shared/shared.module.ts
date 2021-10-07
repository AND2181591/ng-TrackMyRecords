import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material.module';

import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    InputComponent,
    ModalComponent,
    OrderListComponent,
    AlertComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FlexLayoutModule, 
    MaterialModule, 
    FormsModule
  ], 
  exports: [
    FlexLayoutModule, 
    MaterialModule, 
    InputComponent, 
    ModalComponent, 
    OrderListComponent, 
    AlertComponent
  ]
})
export class SharedModule { }
