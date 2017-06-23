import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { UserComponent } from './components/user.component';
import { CurrencyComponent } from './components/currency.component';

import { FileuploadComponent } from './Components/fileupload/fileupload.component'

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'currency', component: CurrencyComponent },
    { path: 'fileupload', component: FileuploadComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)