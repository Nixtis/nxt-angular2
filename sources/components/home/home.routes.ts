import { Inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router'

import { AppActions } from '../../app'
import { HomeComponent } from './home.component'

export class HomeResolver implements CanActivate {
    private appStore

    constructor (
        @Inject('AppStore') appStore,
    ) {
        this.appStore = appStore
    }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.appStore.dispatch(AppActions.setLoading(true))

        return true
    }
}

export const homeRoute = {
    canActivate: [ HomeResolver ],
    component: HomeComponent,
    path: 'home',
}

/// ROUTE EXPORTATION START
/// ROUTE EXPORTATION END

/// RESOLVERS IMPORTATION START
/// RESOLVERS IMPORTATION END

/// PROVIDERS EXPORTATION START
export const HOME_ROUTE_PROVIDERS = [
    HomeResolver,
]
/// PROVIDERS EXPORTATION END
