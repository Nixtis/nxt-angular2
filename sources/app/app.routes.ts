import { ModuleWithProviders } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from '../components/home/home.component'

const routes: Routes = [
    {
        component: HomeComponent,
        path: '',
    },
]

export const APP_ROUTER_PROVIDER: any[] = []

export const routing: ModuleWithProviders = RouterModule.forRoot(routes)
