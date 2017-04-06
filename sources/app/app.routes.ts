import { ModuleWithProviders } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

/// ROUTE IMPORTATION START
import {
    HOME_ROUTE_PROVIDERS,
    homeRoute,
} from '../components/home/home.routes'
/// ROUTE IMPORTATION END

/// APP ROUTER EXPORTATION START
export const APP_ROUTER_PROVIDER: any[] = [
    HOME_ROUTE_PROVIDERS,
]
/// APP ROUTER EXPORTATION END

/// ROUTES DEFINITION START
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home',
    },
    homeRoute,
]
/// ROUTES DEFINITION END

export const routing: ModuleWithProviders = RouterModule.forRoot(routes)
