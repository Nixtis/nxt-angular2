import { Inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router'

import { AppActions } from '../../app'
import { TestComponent } from './test.component'

export class TestResolver implements CanActivate {
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

export const testRoute = {
    canActivate: [ TestResolver ],
    component: TestComponent,
    path: 'test',
}


/// ROUTE EXPORTATION START
export { fooRoute } from './foo/foo.routes'
export { barRoute } from './foo/bar/bar.routes'
/// ROUTE EXPORTATION END

/// RESOLVERS IMPORTATION START
import { FooResolver } from './foo/foo.routes'
import { BarResolver } from './foo/bar/bar.routes'
/// RESOLVERS IMPORTATION END

/// PROVIDERS EXPORTATION START
export const TEST_ROUTE_PROVIDERS = [
    TestResolver,
    FooResolver,
    BarResolver,
]
/// PROVIDERS EXPORTATION END
