import { Inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router'

import { AppActions } from '../../../app'
import { FooComponent } from './foo.component'

export class FooResolver implements CanActivate {
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

export const fooRoute = {
    canActivate: [ FooResolver ],
    component: FooComponent,
    path: 'test/foo',
}
