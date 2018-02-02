import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ProductosListComponent } from './components/productos-list.component';
import { ProductoAddComponent } from './components/producto-add.component';
import { ProductoDetailComponent } from './components/producto-detail.component';

const appRoutes: Routes =[
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path: 'productos', component: ProductosListComponent },
  {path: 'crear-producto', component: ProductoAddComponent },
  {path: 'producto/:id', component: ProductoDetailComponent },
  {path: '**', component: ErrorComponent }
];

export const appRoutesProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);