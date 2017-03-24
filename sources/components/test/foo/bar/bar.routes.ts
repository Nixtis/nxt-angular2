import { Inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router'

import { AppActions } from '../../../../app'
import { BarComponent } from './bar.component'

export class BarResolver implements CanActivate {
    private appStore

    constructor (
        @Inject('AppStore') appStore
    ) {
        this.appStore = appStore
    }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.appStore.dispatch(AppActions.setAppState({ loading: true }))

        return true
    }
}

export const barRoute = {
    canActivate: [ BarResolver ],
    component: BarComponent,
    path: 'test/foo/bar',
}
