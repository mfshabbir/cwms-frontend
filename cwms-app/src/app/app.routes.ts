import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CwtaskListComponent } from './cwtask-list/cwtask-list.component';
import { CreateCwtaskComponent } from './create-cwtask/create-cwtask.component';
import { UpdateCwtaskComponent } from './update-cwtask/update-cwtask.component';
import { DetailsCwtaskComponent } from './details-cwtask/details-cwtask.component';

export const routes: Routes = [
    {path: 'cwtasks', component: CwtaskListComponent},
    {path: 'create-cwtask', component: CreateCwtaskComponent},
    {path: '',redirectTo: 'cwtasks' , pathMatch: 'full'},
    {path: 'update-cwtask/:id', component: UpdateCwtaskComponent},
    {path: 'cwtask-details/:id', component: DetailsCwtaskComponent}

];
